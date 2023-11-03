import React, { useEffect, useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const name = localStorage.getItem('name');

// console.log(name)

function Left_Admin() {
    const [img, setImg] = useState();

    // console.log(img)

    return (
        <div className={cx('box')} id="box2">
            <div className={cx('left')}>
                <Link to="/api/admin" style={{ color: '#fff' }}>
                    <div className={cx('logo')}>
                        <div>
                            <img src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" />
                        </div>
                        <div>
                            <h1>Home</h1>
                        </div>
                    </div>
                </Link>

                <div className={cx('author')}>
                    <div>
                        <img src={img} />
                    </div>
                    <div>
                        <h3>{name != '' ? name : 'Đăng ký'}</h3>
                    </div>
                </div>

                <div className={cx('search')}>
                    <div>
                        <input type="text" placeholder="Search" />
                    </div>
                </div>

                <div className={cx('dropdown')}>
                    <details>
                        <summary>
                            <Link to="/api/select/product">
                                Danh Sách Người Đk
                            </Link>
                        </summary>
                        <ul>
                            <li>
                                {' '}
                                <div className={cx('conten')} id="name">
                                    <Link
                                        to="/api/create/product"
                                        style={{ color: '#fff' }}
                                    >
                                        <p>Create</p>
                                    </Link>
                                </div>
                            </li>
                            <li>Dashboard 2</li>
                            <Link to="/">
                                <li>Dashboard 3</li>
                            </Link>
                        </ul>
                    </details>
                </div>

                <div className={cx('Widgets')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-table-cells"></i>
                    </div>

                    <div></div>
                </div>

                <div className={cx('dropdown_Layout')}>
                    <details>
                        <summary>
                            <Link to={'/api/listkhachhang'}>
                                DS Người Mua Hàng
                            </Link>
                        </summary>

                        <ul>
                            <Link to={'/admin'}>
                                <li>Lớp A1</li>
                            </Link>
                            <Link to={'/admin/a2'}>
                                <li>Lớp A2</li>
                            </Link>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('dropdown_Charts')}>
                    <details>
                        <summary>
                            <Link
                                to="/chart"
                                style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                }}
                            >
                                Charts
                            </Link>
                        </summary>
                        <ul>
                            <li>Điều khoản 1</li>
                            <li>Điều khoản 2</li>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('dropdown_UI')}>
                    <details>
                        <summary>
                            <Link
                                to={'/quanly'}
                                style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                }}
                            >
                                Quản Lý
                            </Link>
                        </summary>
                        <ul>
                            <li>Điều khoản 1</li>
                            <li>Điều khoản 2</li>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('dropdown_Forms')}>
                    <details>
                        <summary>Forms</summary>
                        <ul>
                            <li>Điều khoản 1</li>
                            <li>Điều khoản 2</li>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('dropdown_Tables')}>
                    <details>
                        <summary>Tables</summary>
                        <ul>
                            <li>Điều khoản 1</li>
                            <li>Điều khoản 2</li>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('EXAMPLES')}>
                    <h4>EXAMPLES</h4>
                </div>

                <div className={cx('Calendar')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-calendar-days"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Calendar</p>
                    </div>
                    <div></div>
                </div>

                <div className={cx('Gallery')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-gallery-thumbnails"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Gallery</p>
                    </div>
                    <div></div>
                </div>

                <div className={cx('Kanban')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-square-kanban"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Kanban Board</p>
                    </div>
                    <div></div>
                </div>

                <div className={cx('dropdown_Mailbox')}>
                    <details>
                        <summary>Mailbox</summary>
                        <ul>
                            <li>Điều khoản 1</li>
                            <li>Điều khoản 2</li>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('dropdown_Pages')}>
                    <details>
                        <summary>Pages</summary>
                        <ul>
                            <li>Điều khoản 1</li>
                            <li>Điều khoản 2</li>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('dropdown_Extras')}>
                    <details>
                        <summary>Extras</summary>
                        <ul>
                            <li>Điều khoản 1</li>
                            <li>Điều khoản 2</li>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('dropdown_Search')}>
                    <details>
                        <summary>Search</summary>
                        <ul>
                            <li>Điều khoản 1</li>
                            <li>Điều khoản 2</li>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('MISCELLANEOUS')}>
                    <h4>MISCELLANEOUS</h4>
                </div>

                <div className={cx('Tabbed')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Tabbed IFrame Plugin</p>
                    </div>
                    <div></div>
                </div>

                <div className={cx('Documentation')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-file"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Documentation</p>
                    </div>
                    <div></div>
                </div>

                <div className={cx('MULTI')}>
                    <h4>MULTI LEVEL EXAMPLE</h4>
                </div>

                <div className={cx('Level_1')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-circle"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Level 1</p>
                    </div>
                    <div></div>
                </div>

                <div className={cx('dropdown_Level_1')}>
                    <details>
                        <summary>Level 1</summary>
                        <ul>
                            <li>Điều khoản 1</li>
                            <li>Điều khoản 2</li>
                            <li>Điều khoản 3</li>
                            <li>Điều khoản 4</li>
                        </ul>
                    </details>
                </div>

                <div className={cx('Level_1')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-circle"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Level 1</p>
                    </div>
                    <div></div>
                </div>

                <div className={cx('LABELS')}>
                    <h4>LABELS</h4>
                </div>

                <div className={cx('Important')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-genderless"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Important </p>
                    </div>
                    <div></div>
                </div>

                <div className={cx('Warning')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-genderless"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Warning </p>
                    </div>
                    <div></div>
                </div>

                <div className={cx('Informational')}>
                    <div className={cx('icon')}>
                        <i class="fa-solid fa-genderless"></i>
                    </div>
                    <div className={cx('conten')}>
                        <p>Informational </p>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Left_Admin;
