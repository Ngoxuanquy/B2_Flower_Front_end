import { useState } from "react"

import classNames from "classnames/bind"
import styles from "./search.module.scss"

const cx = classNames.bind(styles)

const Search = () => {

    const [value, setValue] = useState('')

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const handleSearch = () => {
        alert(`you searched ${value}`)
        // do someting....
    }

    return (
        <div className={cx('container')}>
            <input className={cx('input')} type="text" placeholder="Enter something..." value={value} onChange={e => handleValue(e)}/>
            <div 
                className={cx('btn-search')}
                onClick={() => handleSearch()}
            >search</div>
        </div>
    )
}
export default Search