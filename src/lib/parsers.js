export function parseUserFromUri(uri) {
  return uri.split('<sip:')[1].split('@')[0]
}
export function parseAorFromUri(uri) {
  return uri.split('<')[1].split('>')[0]
}

