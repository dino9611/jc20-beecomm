const { dbCon } = require("./../connection");
// encrypsi by crypto nodejs
const crypto = require("crypto");

const hashPass = (password) => {
  // puripuriprisoner adalah kunci untuk hashing
  let hashing = crypto
    .createHmac("sha256", "puripuriprisoner")
    .update(password)
    .digest("hex");
  return hashing;
};

module.exports = {
  // register
  register: async (req, res) => {
    // TODO ALGORTIHM REGISTER:
    // 1. (OPTIONAL) CEK VALIDASI PASSWORDNYA, USERNAME TIDAK BOLEH ADA SPASI
    // 2. CEK APAKAH USERNAME atau email  SUDAH ADA DI DATABASE
    // 3. KALO ADA , THROW ERROR USERNAME atau email TELAH DIGUNAKAN
    // 4. KALA NGGAK ADA , CREATE DATA USER KE DATABASE KE TABLE USER,
    // 4a. sebelum diinput kedalam table password di hashing/bcrypt
    // 5. PASTIKAN ISVERIFIED 0 BY DEFAULT.
    // 6. GET DATA USER, TERUS BUAT TOKEN DARI DATA USER,
    // 7. KIRIM EMAIL VERIFIKASI  DENGAN WAKTU X MENIT
    // 8. JIKA LANGSUNG LOGIN ,
    // 9. DATA USER DAN TOKEN KRIIM KE USER.
    let conn, sql;
    let { username, email, password } = req.body;
    try {
      // buat connection dari pool karena query lebih dari satu kali
      conn = await dbCon.promise().getConnection();
      // validasi spasi untuk username

      let spasi = new RegExp(/ /g);
      if (spasi.test(username)) {
        // klo ada spasi masuk sini
        throw { message: "ada spasinya bro" };
      }

      sql = `select id from users where username = ? or email = ?`;

      let [result] = await conn.query(sql, [username, email]);
      if (result.length) {
        //   masuk sini berarti ada username atua emaail yang samsa
        throw { message: "username atau email telah digunakan" };
      }
      sql = `INSERT INTO users set ?`;
      //   buat object baru
      let insertData = {
        username,
        email,
        password: hashPass(password),
      };
      //   req.body.password = hashPass(password)
      let [result1] = await conn.query(sql, insertData);
      // get data user lagi
      sql = `select id,username,isVerified,email from users where id = ?`;
      let [userData] = await conn.query(sql, [result1.insertId]);
      //   buat token email verified dan token untuk aksees
      //   kirim email
      //   kriim data user dna token akses lagi untuk login
      conn.release();
      return res.status(200).send(userData[0]);
    } catch (error) {
      conn.release();
      return res.status(500).send({ message: error.message || error });
    }
  },
  // login
};
