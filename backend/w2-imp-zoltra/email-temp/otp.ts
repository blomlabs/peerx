export const otpTemp = (name: string, code: string) => `<div
  style="
    font-family: 'Poppins', Arial, sans-serif;
    text-align: center;
    padding: 40px 20px;
    background: #121212;
    color: #ffffff;
  "
>
  <img
    src="https://res.cloudinary.com/dv4mozbaz/image/upload/v1741549470/lgl5dyetcn1tmr5btoug.png"
    alt="Peerx Logo"
    style="width: 100px; margin-bottom: 0"
  />
  <h2 style="color: #ffffff">Hello, ${name} 👋</h2>
  <p style="color: #555; font-size: 18px; font-weight: 500">
    Your verification code is
  </p>
  <div
    style="
      display: inline-block;
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      background-color: #34c759;
      padding: 10px 20px;
      border-radius: 8px;
      letter-spacing: 3px;
    "
  >
    ${code}
  </div>
  <p style="color: #777; font-size: 14px; margin-top: 15px">
    This code will expire in 10 minutes. If you did not request this, please
    ignore this email.
  </p>

  <hr
    style="
      border: none;
      border-top: 1px solid #444;
      margin: 30px auto;
      width: 80%;
    "
  />

  <!-- Social Media Links -->
  <p style="font-size: 14px; color: #aaa">Follow us on social media</p>
  <div style="margin-top: 10px">
    <a
      href="https://twitter.com/peerx"
      target="_blank"
      style="margin: 0 10px; text-decoration: none"
    >
      <img
        src="https://img.icons8.com/?size=100&id=rHBHb9TRpKaI&format=png&color=ffffff"
        width="26"
      />
    </a>
    <a
      href="https://instagram.com/peerx"
      target="_blank"
      style="margin: 0 10px; text-decoration: none"
    >
      <img
        src="https://img.icons8.com/?size=100&id=32292&format=png&color=ffffff"
        width="26"
      />
    </a>
    <a
      href="https://linkedin.com/company/peerx"
      target="_blank"
      style="margin: 0 10px; text-decoration: none"
    >
      <img
        src="https://img.icons8.com/?size=100&id=114445&format=png&color=000000"
        width="26"
      />
    </a>
    <a
      href="https://facebook.com/peerx"
      target="_blank"
      style="margin: 0 10px; text-decoration: none"
    >
      <img
        src="https://img.icons8.com/?size=100&id=118497&format=png&color=ffffff"
        width="26"
      />
    </a>
  </div>
</div>`;
