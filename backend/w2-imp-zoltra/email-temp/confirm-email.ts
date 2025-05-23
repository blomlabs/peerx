export const confirmMailTemp = (name: string, url: string) => `<div
      style="
        font-family: 'Poppins', Arial, sans-serif;
        text-align: center;
        padding: 40px 20px;
        background: #121212;
        color: #ffffff;
      "
    >
      <div style="display: flex; flex-direction: column; align-items: center">
        <!-- Peerx Logo -->
        <img
          src="https://res.cloudinary.com/dv4mozbaz/image/upload/v1741549470/lgl5dyetcn1tmr5btoug.png"
          alt="Peerx Logo"
          style="width: 100px; margin-bottom: 15px"
        />
      </div>

      <!-- Welcome Message -->
      <h1 style="font-size: 28px; font-weight: 500; margin: 0">
        Welcome to PeerX!
      </h1>
      <p
        style="
          font-size: 18px;
          color: #ccc;
          max-width: 480px;
          margin: 15px auto;
          line-height: 1.6;
        "
      >
        Hi <strong style="color: #50c878">${name}</strong>, we’ve created an
        account for you. Please confirm your email address to get started and
        explore the full potential of
        <strong style="color: #50c878">PeerX</strong>.
      </p>

      <!-- Call-to-Action Button -->
      <a
        href="${url}"
        target="_blank"
        style="
          display: inline-block;
          background: #34c759;
          color: #ffffff;
          padding: 14px 32px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.3s ease;
          text-transform: uppercase;
          margin-top: 20px;
        "
      >
        Confirm Email
      </a>

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

      <p style="font-size: 12px; color: #777; margin-top: 20px">
        You're receiving this email because you joined PeerX. If this wasn't
        you, please ignore this email.
      </p>
    </div>`;
