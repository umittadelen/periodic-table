import os
import sys
import requests
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtCore import QUrl, Qt
from PyQt5 import QtGui
import ctypes

class CustomWebEnginePage(QWebEnginePage):
    def __init__(self, parent=None):
        super().__init__(parent)

    def acceptNavigationRequest(self, url, navigationType, isMainFrame):
        # Prevent saving redirected URLs
        if navigationType == QWebEnginePage.NavigationTypeRedirect:
            return False
        return True

class PeriodicTableApp(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Periodic Table")
        self.setWindowIcon(QtGui.QIcon('./icon.ico'))
        self.setGeometry(100, 100, 800, 600)

        # Create a QWebEngineView widget
        self.browser = QWebEngineView()
        self.browser.setPage(CustomWebEnginePage(self.browser))

        # Load the URL
        self.url = "https://umittadelen.github.io/periodic-table/"
        self.browser.setUrl(QUrl(self.url))
        self.setCentralWidget(self.browser)

        # Connect loadFinished signal to check for updates
        self.browser.loadFinished.connect(self.on_load_finished)

    def on_load_finished(self, success):
        if success:
            # Save page content if loaded successfully
            self.save_page_content()

    def save_page_content(self):
        # Get the current user's home directory and create the .PTable directory
        user_home = os.path.expanduser("~")
        directory = os.path.join(user_home, ".PTable")
        if not os.path.exists(directory):
            os.makedirs(directory)

        # Define the path for the saved HTML file
        html_file_path = os.path.join(directory, "periodic_table.html")

        # Use toHtml method to get the current HTML of the page
        self.browser.page().toHtml(lambda html: self.save_html_file(html, html_file_path))

        # Check if online before downloading resources
        if self.check_internet_connection():
            # Download the necessary files
            json_urls = [
                "https://raw.githubusercontent.com/umittadelen/periodic-table/main/elements.json",
                "https://raw.githubusercontent.com/umittadelen/periodic-table/main/script.js",
                "https://raw.githubusercontent.com/umittadelen/periodic-table/main/prevent.js"
            ]
            
            for file_url in json_urls:
                self.download_resource(file_url, directory)
        else:
            print("No internet connection. Resources will not be downloaded.")

    def check_internet_connection(self):
        try:
            # Try to connect to a well-known host
            requests.get("http://www.google.com", timeout=5)
            return True
        except requests.ConnectionError:
            return False

    def save_html_file(self, html, file_path):
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(html)

    def download_resource(self, url, directory):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                # Extract the filename from the URL
                file_name = os.path.basename(url)
                file_path = os.path.join(directory, file_name)
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(response.text)
            else:
                print(f"Failed to download {url}: {response.status_code}")
        except Exception as e:
            print(f"Error downloading {url}: {str(e)}")

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_F11:
            if self.isFullScreen():
                self.setWindowState(self.windowState() & ~Qt.WindowFullScreen)
            else:
                self.setWindowState(self.windowState() | Qt.WindowFullScreen)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    if sys.platform == "win32":
        ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID('my.app.id')
    window = PeriodicTableApp()
    window.show()
    sys.exit(app.exec_())
