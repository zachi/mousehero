SET basepath=%~dp0

msiexec /i %basepath%installers\node-v10.15.1-x64.msi /qn /norestart
%basepath%installers\Git-2.20.1-64-bit.exe  /VERYSILENT /NORESTART /NOCANCEL /SP- /CLOSEAPPLICATIONS /RESTARTAPPLICATIONS /COMPONENTS="icons,ext\reg\shellhere,assoc,assoc_sh"
msiexec.exe /l*v mdbinstall.log  /qb /i  %basepath%installers\mongodb-win32-x86_64-2008plus-ssl-4.0.5-signed.msi ADDLOCAL="Server,ServerService,Client" SHOULD_INSTALL_COMPASS="1"
msiexec.exe /i  %basepath%installers\mongodb-compass-1.16.3-win32-x64.msi 
"%ProgramFiles%(x86)\MongoDB Compass Installer\MongoDBCompass.exe"
"%ProgramFiles(x86)%\MongoDB Compass Installer\MongoDBCompass.exe"
cd c:/
"%ProgramFiles%\git\cmd\git" clone https://github.com/zachi/mousehero.git
xcopy /E %basepath%files-to-copy "c:\" /Y
cd mousehero
"%ProgramFiles%\nodejs\npm" install
set /p temp="press any key to continue"
pause
pause