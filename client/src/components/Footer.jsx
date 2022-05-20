import React from "react";

import style from "./styles/Footer.module.css"

function Footer() {
  return (
    <div className={style.footerBackground}>
      <div className={style.footer}>
        <p>© 2022 Brian Sanchez, All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;