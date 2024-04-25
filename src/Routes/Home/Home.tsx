import React from "react";
import MenuTile from "../../Components/MenuTile";
import MainCam from "../../Features/MainCam/MainCam";
import { MdLogin, MdAdd, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";

function Home() {
  const [isLogged, setIsLogged] = React.useState(false);

  return (
    <div className="grid grid-cols-7 grid-rows-5 gap-6 h-[90vh]">
      <MenuTile
        col_span={2}
        row_span={2}
        col_start={1}
        row_start={1}
      ></MenuTile>
      <MenuTile
        col_span={3}
        row_span={1}
        col_start={3}
        row_start={1}
      ></MenuTile>
      <MenuTile col_span={2} row_span={1} col_start={6} row_start={1}>
        <Link
          to={isLogged ? "/profile" : "/login"}
          className="flex items-center justify-center w-full h-full text-5xl text-gray-600"          
        >
          {isLogged ? (
            <MdPerson />
          ) : (
            <div className="flex">
              <MdLogin />
              <MdAdd />
            </div>
          )}
        </Link>
      </MenuTile>
      <MenuTile col_span={4} row_span={3} col_start={3} row_start={2}>
        <MainCam />
      </MenuTile>
      <MenuTile
        col_span={1}
        row_span={3}
        col_start={7}
        row_start={2}
      ></MenuTile>
      <MenuTile
        col_span={2}
        row_span={3}
        col_start={1}
        row_start={3}
      ></MenuTile>
      <MenuTile
        col_span={5}
        row_span={1}
        col_start={3}
        row_start={5}
      ></MenuTile>
    </div>
  );
}

export default Home;
