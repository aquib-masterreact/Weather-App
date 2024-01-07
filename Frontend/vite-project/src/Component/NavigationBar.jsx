import "./comp.css"
// eslint-disable-next-line react/prop-types
function NavigationBar({city,onClick}) {
  return (
    <div className="btn-cont">
      <button className="btn" onClick={onClick}>{city}</button>
    </div>
  )
}

export default NavigationBar
