const Header = () => {
   const handleClick = (e) => {
      e.target.closest('.App').classList.toggle('dark-mode');
   };
   return (
      <div className="header">
         <div className="header__inner">
            <h1 className="heading">todo</h1>
            <button className="switch-btn" onClick={handleClick}></button>
         </div>
      </div>
   );
};

export default Header;
