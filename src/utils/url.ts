export function relativeCDNUrl(path: string) {
  try {
    const url = new URL(path);
    return path;
  } catch (error) {
    //localhost:9425/
    return "https://twitter-clone-api.itsbohara.com" + path;
  }
}
