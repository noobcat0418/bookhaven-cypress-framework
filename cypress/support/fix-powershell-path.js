// Preload fix: ensures PowerShell is in PATH for Windows machines where it's missing
const psDir = `${process.env.WINDIR || 'C:\\Windows'}\\System32\\WindowsPowerShell\\v1.0`;
if (process.platform === 'win32' && !process.env.PATH?.includes('WindowsPowerShell')) {
  process.env.PATH = `${process.env.PATH};${psDir}`;
}
