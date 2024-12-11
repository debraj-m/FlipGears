#!/bin/bash

# Hardcoded project IDs for dev and prod environments
DEV_PROJECT_ID="assisto-dev-52a1d"
PROD_PROJECT_ID="dev-assisto"

# Function to display usage information
usage() {
    echo "Usage: $0 [build|push|deploy|buildanddeploy|buildformac] [dev|prod]"
    exit 1
}

# Function to build the Docker image
build() {
    local ENV=$1
    if [ "$ENV" == "dev" ]; then
        PROJECT_ID=$DEV_PROJECT_ID
    elif [ "$ENV" == "prod" ]; then
        PROJECT_ID=$PROD_PROJECT_ID
    else
        usage
    fi

    local IMAGE_NAME="ml-application"
    local IMAGE_TAG="latest"
    local IMAGE_URI="asia.gcr.io/${PROJECT_ID}/${IMAGE_NAME}:${IMAGE_TAG}"

    echo "Building Docker image..."
    docker build -t ${IMAGE_URI} . --platform linux/amd64

    echo "Docker image built and tagged as ${IMAGE_URI}."
}

# Function to build the Docker image for macOS
build_for_mac() {
    local ENV=$1
    if [ "$ENV" == "dev" ]; then
        PROJECT_ID=$DEV_PROJECT_ID
    elif [ "$ENV" == "prod" ]; then
        PROJECT_ID=$PROD_PROJECT_ID
    else
        usage
    fi

    local IMAGE_NAME="ml-application"
    local IMAGE_TAG="latest"
    local IMAGE_URI="asia.gcr.io/${PROJECT_ID}/${IMAGE_NAME}:${IMAGE_TAG}"

    echo "Building Docker image for macOS..."
    docker build -t ${IMAGE_URI} . --platform linux/arm64

    echo "Docker image built for macOS and tagged as ${IMAGE_URI}."
}

# Function to push and tag the Docker image
push_and_tag() {
    local ENV=$1
    if [ "$ENV" == "dev" ]; then
        PROJECT_ID=$DEV_PROJECT_ID
    elif [ "$ENV" == "prod" ]; then
        PROJECT_ID=$PROD_PROJECT_ID
    else
        usage
    fi

    local IMAGE_NAME="ml-application"
    local IMAGE_TAG="latest"
    local IMAGE_URI="asia.gcr.io/${PROJECT_ID}/${IMAGE_NAME}:${IMAGE_TAG}"

    echo "Authenticating with Google Cloud..."
    gcloud auth configure-docker

    echo "Pushing Docker image..."
    docker push ${IMAGE_URI}

    echo "Docker image pushed to ${IMAGE_URI}."
}

# Function to deploy the Docker image to Google Cloud Run
deploy() {
    local ENV=$1
    if [ "$ENV" == "dev" ]; then
        PROJECT_ID=$DEV_PROJECT_ID
    elif [ "$ENV" == "prod" ]; then
        PROJECT_ID=$PROD_PROJECT_ID
    else
        usage
    fi

    local IMAGE_NAME="ml-application"
    local IMAGE_TAG="latest"
    local IMAGE_URI="asia.gcr.io/${PROJECT_ID}/${IMAGE_NAME}:${IMAGE_TAG}"



    echo "Deploying to Google Cloud Run..."
    gcloud run deploy ${IMAGE_NAME} \
      --image ${IMAGE_URI} \
      --platform managed \
      --region us-west1 \
      --allow-unauthenticated \
      --project ${PROJECT_ID} \
     

    echo "Deployment completed for ${ENV} environment."
}

# Function to build, push, and deploy all in one go
build_and_deploy() {
    local ENV=$1
    build $ENV
    push_and_tag $ENV
    deploy $ENV
}

# Main script logic
if [ $# -lt 2 ]; then
    usage
fi

COMMAND=$1
ENV=$2

case $COMMAND in
    build)
        build $ENV
        ;;
    buildformac)
        build_for_mac $ENV
        ;;
    push)
        push_and_tag $ENV
        ;;
    deploy)
        deploy $ENV
        ;;
    buildanddeploy)
        build_and_deploy $ENV
        ;;
    *)
        usage
        ;;
esac
