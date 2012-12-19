#!/usr/bin/python
import subprocess
subprocess.call(["git", "add",  "-A", "."])
subprocess.call(["git", "commit", "-a", "--allow-empty-message", "-m", "\'\'"])
subprocess.call(["git", "push"])
exit()
