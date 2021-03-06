import React, {useState} from 'react'
import './MenuBar.css'
import {NavLink} from "react-router-dom";

const MenuBar = () => {
    const [classList, setClassList] = useState<string>('menu-bar hidden')
    const [icon, setIcon] = useState<string>('menu')
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const toggleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked
        if (isChecked) {
            showMenuBar()
        } else {
            hideMenuBar()
        }
    }

    const hideMenuBar = () => {
        setClassList('menu-bar hidden')
        setIcon('menu')
        setIsChecked(false)
    }

    const showMenuBar = () => {
        setClassList('menu-bar shown')
        setIcon('close')
        setIsChecked(true)
    }

    return (
        <div className={classList}>
            <label className="menu-toggle"  >
                <i className="material-icons">{icon}</i>
                <input type="checkbox" hidden onChange={toggleHandler} checked={isChecked}/>
            </label>
            <h3>Menu</h3>

            <p><NavLink to='/' exact onClick={hideMenuBar}>Test List</NavLink></p>
            <p><a href={`${process.env.REACT_APP_EDITOR_ADDRESS}`} onClick={hideMenuBar}>Editor</a></p>
        </div>
    )

}
export default MenuBar
