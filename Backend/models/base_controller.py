from abc import abstractmethod
from typing import Awaitable, Callable, List, Optional

from fastapi import APIRouter, FastAPI, HTTPException, WebSocket
from utils.logger import logger



class BaseController:
    """Base controller class for all route controllers."""

    def __init__(self, app: FastAPI, route_prefix: str, controllers:List["BaseSubController"]=[]):
        self.router = APIRouter()
        self.route_prefix = route_prefix
        self.app = app
        self.register_controllers(controllers)

    def _set_router_prefix(self, prefix: str):
        """Sets the route prefix for the controller."""
        self.route_prefix = prefix

    def register_route(
        self, rule: str, view_func: Callable, methods: Optional[List[str]] = None
    ):
        """Registers a route with the given rule and view function."""
        methods = methods or ["GET"]

        for method in methods:
            if method == "GET":
                self.router.add_api_route(
                    f"{self.route_prefix}/{rule}", view_func, methods=["GET"]
                )

            elif method == "POST":
                self.router.add_api_route(
                    f"{self.route_prefix}/{rule}", view_func, methods=["POST"]
                )
            elif method == "PUT":
                self.router.add_api_route(
                    f"{self.route_prefix}/{rule}", view_func, methods=["PUT"]
                )
            elif method == "DELETE":
                self.router.add_api_route(
                    f"{self.route_prefix}/{rule}", view_func, methods=["DELETE"]
                )
            else:
                raise ValueError(f"Unsupported method: {method}")

    def register_websocket_route(
        self, rule: str, view_func: Callable[[WebSocket], Awaitable[None]]
    ):
        """Registers a websocket route with the given rule and view function."""
        logger.info(self.route_prefix)
        self.router.add_websocket_route(f"{self.route_prefix}/{rule}", view_func)

    def include(self, app: FastAPI):
        app.include_router(self.router)

    def register_controllers(self, controllers: List["BaseSubController"]):
        """Registers a list of sub-controllers with their routes."""
        for controller in controllers:
            sub_route_prefix = f"{self.route_prefix}{controller.route_prefix}"
            controller._set_router_prefix(sub_route_prefix)
            controller.register_routes()
            self.app.include_router(controller.router)
            logger.info(f"Registered sub-controller with prefix: {sub_route_prefix}")
        pass


class BaseSubController(BaseController):
    """Base sub-controller class for all route controllers."""
    def __init__(self, app: FastAPI, route_prefix: str, controllers:List["BaseSubController"]=[],):
        super().__init__(app, route_prefix, controllers)
        

    @abstractmethod
    def register_routes(self):
        """Registers routes for the sub-controller."""
        pass
