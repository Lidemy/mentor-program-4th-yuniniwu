const request = require("request");
const process = require("process");
const base_URL = "https://lidemy-book-store.herokuapp.com/books";

// node hw2.js list 20 => print the first 20 id & name
if (process.argv[2] === "list") {
  let numBooks = Number(process.argv[3]);
  request(`${base_URL}?_limit=${numBooks}`, function (error, response, body) {
    if (error !== null) {
      console.error("error:", error);
    }
    const data = JSON.parse(body);
    for (let i = 0; i < numBooks; i++) {
      console.log(`${data[i].id} ${data[i].name}`);
    }
  });

  // node hw2.js read 1 => print the name of the id inputed
} else if (process.argv[2] === "read") {
  let i = process.argv[3];
  request(`${base_URL}/${i}`, function (error, response, body) {
    if (error !== null) {
      console.error("error:", error);
    }
    const data = JSON.parse(body);
    console.log(`${data.id} ${data.name}`);
  });
} else if (process.argv[2] === "delete") {
  let i = process.argv[3];
  request.del(`${base_URL}/${i}`, function (error, response, body) {
    if (error !== null) {
      console.error("error:", error);
    }
  });
} else if (process.argv[2] === "create") {
  let i = process.argv[3];
  request.post(
    {
      url: base_URL,
      form: {
        name: process.argv[3], // I love coding
      },
    },
    function (error, response, body) {
      if (error !== null) {
        console.error("error:", error);
      }
      // const data = JSON.parse(body);
      // console.log(data);
      // {name: 'Secret', id: 27}
    }
  );
} else if (process.argv[2] === "update") {
  let i = process.argv[3];
  let newName = process.argv[4];
  request.patch(
    {
      url: `${base_URL}/${i}`,
      form: {
        name: process.argv[4],
      },
    },
    function (error, response, body) {
      if (error !== null) {
        console.error("error:", error);
      }
      // 印出id = i 那本書，看名字有沒有改

      // const data = JSON.parse(body);
      // console.log(data);
      // { id: 23, name: '哈利波特' }
    }
  );
}
