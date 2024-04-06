import { getMenuName } from "@/lib/itemLanguageHelpers";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

const Menus = (props) => {

  const { clickHandler, language } = props;
  const { allMenus, firstMenuLoad, theme } = useSelector((state) => state.menu);

  const changeCurrentActiveMenu = (menu) => {
    clickHandler(menu);
    window.scrollTo(0, 0);
  };

  return (
    <div
      aria-description="Menus Section of the page that shows all menus of the venue"
      className="flex items-center w-full overflow-x-auto py-1 px-2"
      style={{ backgroundColor: theme?.MV_MenuBackgroundColor }}
      about="Menus Section"
    >
      <ul className={"list-none flex gap-2"}>
        {allMenus && allMenus?.map((menu, index) => {
          return (
            <li
              key={index}
              title={getMenuName(menu, language.id)}
              about={"menu " + getMenuName(menu, language.id)}
              onClick={() => changeCurrentActiveMenu(menu)}
              className={cn("listItem min-w-28 line-clamp-1 whitespace-nowrap cursor-pointer rounded-lg border border-black transition-all duration-200 text-center p-[2px] px-1", {
                "active": menu.id === firstMenuLoad.id
              })}
            >
              {getMenuName(menu, language.id)}
            </li>
          );
        })}
      </ul>
      <style jsx>
        {`
          .listItem{
            border-color: ${theme?.MV_MenuTextColor};
            color: ${theme?.MV_MenuTextColor};
          }
          .active{
            position: relative;
            border-color: ${theme?.MV_ActiveMenuColor};
          }
          .active::after {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 3px;
            border-radius: 0.30rem;
            background-color: ${theme?.MV_ActiveMenuColor};
            animation: activeMenu 0.2s linear;
          }
        `}
      </style>
    </div >
  );
};

export default Menus;
