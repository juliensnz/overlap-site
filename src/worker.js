// Cloudflare's static assets ignore Range requests, and Safari needs them to play <video>.
// Only the .mp4 files reach this Worker (see run_worker_first in wrangler.jsonc). The largest is under 5 MB, so slicing in memory is fine.
export default {
    async fetch(request, env) {
        const response = await env.ASSETS.fetch(request);
        if (response.status !== 200) return response;

        const headers = new Headers(response.headers);
        headers.set("Accept-Ranges", "bytes");

        const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("Range") ?? "");
        if (!match || (!match[1] && !match[2])) return new Response(response.body, { status: 200, headers });

        const body = await response.arrayBuffer();
        const size = body.byteLength;
        const start = match[1] ? Number(match[1]) : Math.max(size - Number(match[2]), 0);
        const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;

        if (start >= size || start > end) {
            headers.set("Content-Range", `bytes */${size}`);
            headers.delete("Content-Length");
            return new Response(null, { status: 416, headers });
        }

        headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
        headers.set("Content-Length", String(end - start + 1));
        return new Response(body.slice(start, end + 1), { status: 206, headers });
    },
};
