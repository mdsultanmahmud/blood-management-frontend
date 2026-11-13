// Starts `next dev` on the port of this site's company address and opens it in the browser once
// the server is ready. The address must match the CLIENT web address set in Business Central.
import { spawn } from "node:child_process";

const PORT = "3100";
const URL = `http://roktolife.localhost:${PORT}`;

const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "-p", PORT],
  { stdio: ["inherit", "pipe", "inherit"] },
);

let opened = false;
child.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);
  if (opened || !chunk.toString().includes("Ready")) return;
  opened = true;
  const [cmd, args] =
    process.platform === "win32"
      ? ["cmd", ["/c", "start", "", URL]]
      : process.platform === "darwin"
        ? ["open", [URL]]
        : ["xdg-open", [URL]];
  spawn(cmd, args, { stdio: "ignore", detached: true }).unref();
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code) => process.exit(code ?? 0));
