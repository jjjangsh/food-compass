const HeaderButton = ({ name, onClick }) => {
  return (
    <button className="bg-neutral-100 rounded-xl p-2" onClick={onClick}>
      {name}
    </button>
  );
};

export default HeaderButton;
