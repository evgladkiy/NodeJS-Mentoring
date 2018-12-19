export default function filenameFromPath(path) {
  const pathArray = path.split('/');

  return pathArray[pathArray.length - 1];
}
