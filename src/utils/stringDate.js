export const stringDate = (str) => {
  const string = str.split(" ");
  for (let i = 0; i < months.length; i++) {
    if (string[0] === (i + 1).toString()) {
      string[0] = months[i];
    }
  }
  const time = string[string.length - 1].split(":");
  array_move(string, 0, 1);
  time.pop();
  string.pop();

  return `${string.join("-")} ${time.join(":")} WIB`; 
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}