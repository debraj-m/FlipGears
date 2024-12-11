import logging

from colorama import Back, Fore, Style

logger = logging.getLogger("Talker")


def setup_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format=Fore.BLUE + "%(asctime)s - %(levelname)s - %(message)s",
    )
    logging.basicConfig(
        level=logging.CRITICAL,
        format=Fore.RED + "%(asctime)s - %(levelname)s - %(message)s",
    )
    logging.basicConfig(
        level=logging.DEBUG,
        format=Fore.YELLOW + "%(asctime)s - %(levelname)s - %(message)s",
    )
