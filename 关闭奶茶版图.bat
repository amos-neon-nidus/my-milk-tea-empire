@echo off
title Stop Milk Tea Map
setlocal

cd /d "%~dp0"
set "NO_PAUSE="
if /I "%~1"=="--no-pause" set "NO_PAUSE=1"

echo Stopping Milk Tea Map local server...
echo Checking port 4173 only.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='SilentlyContinue';" ^
  "$ports = @(4173);" ^
  "$targets = @{};" ^
  "netstat -ano -p tcp | ForEach-Object {" ^
  "  if ($_ -match '^\s*TCP\s+\S+:(\d+)\s+\S+\s+LISTENING\s+(\d+)\s*$') {" ^
  "    $port = [int]$Matches[1];" ^
  "    $targetProcessId = [int]$Matches[2];" ^
  "    if ($ports -contains $port) {" ^
  "      $currentPorts = @($targets[$targetProcessId]);" ^
  "      $targets[$targetProcessId] = $currentPorts + $port;" ^
  "    }" ^
  "  }" ^
  "};" ^
  "if ($targets.Count -eq 0) { Write-Host 'No Milk Tea Map server found.'; exit 0 }" ^
  "foreach ($targetProcessId in $targets.Keys) {" ^
  "  $process = Get-Process -Id $targetProcessId -ErrorAction SilentlyContinue;" ^
  "  $portList = (($targets[$targetProcessId] | Sort-Object) -join ', ');" ^
  "  if (-not $process) { Write-Host ('Skip missing PID {0} on port(s) {1}' -f $targetProcessId, $portList); continue }" ^
  "  if ($process.ProcessName -ne 'node') { Write-Host ('Skip PID {0} ({1}) on port(s) {2}' -f $targetProcessId, $process.ProcessName, $portList); continue }" ^
  "  try {" ^
  "    Stop-Process -Id $targetProcessId -Force -ErrorAction Stop;" ^
  "    Write-Host ('Stopped Milk Tea Map server PID {0} on port(s) {1}' -f $targetProcessId, $portList);" ^
  "  } catch {" ^
  "    Write-Host ('Could not stop PID {0}: {1}' -f $targetProcessId, $_.Exception.Message);" ^
  "  }" ^
  "}"

echo.
echo Done.
if not defined NO_PAUSE pause
