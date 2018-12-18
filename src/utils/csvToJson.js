export default function csvToJson(csv) {
  const lines = csv.split('\n');
  const keys = lines[0].split(',');
  const result = [];

  for (let i = 1; i < lines.length; i += 1) {
    const data = {};
    const values = lines[i].split(',');

    values.forEach((value, key) => {
      data[keys[key]] = value;
    });

    result.push(data);
  }

  return JSON.stringify(result);
}
