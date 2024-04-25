import React from "react";
import MenuTile from "../../Components/MenuTile";

function Home() {
  return (
    <div className="grid grid-cols-6 grid-rows-5 gap-6 h-[90vh]">
      <MenuTile col_span={5} row_span={2}></MenuTile>
      <MenuTile col_span={5} row_span={2}></MenuTile>
      <MenuTile col_span={2} row_span={2}></MenuTile>
      <MenuTile col_span={2} row_span={2}></MenuTile>
      <MenuTile col_span={4} row_span={1}></MenuTile>
    </div>
  );
}

export default Home;
