import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './homepage.module.scss';
import AnhNen from '../../../access/anhnen.png';
import Banner1 from '../../../access/banner1.png';
import { Button, Radio, Space, Divider } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ButtomNavigation from '../../../Components/ButtomNavigation/ButtomNavigation';

const cx = classNames.bind(styles);
const HomePage = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className={cx('container_')}>
            <div className="container_">
                <div className={cx('elementor-widget-container_')}>
                    <div className={cx('layout1')}>
                        <div
                            data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="1500"
                        >
                            <h1>LI GIFT</h1>
                            <h3>
                                Chào quý khách hàng thân yêu
                                <br /> Chúng tôi rất tự hào và hân hạnh được
                                giới thiệu đến bạn dịch vụ độc đáo và phong cách
                                của chúng tôi trong lĩnh vực đồ tặng quà. Với
                                tâm huyết và kinh nghiệm dày dặn <br />
                                Tại đây, bạn sẽ tìm thấy một sự đa dạng độc đáo
                                của các món quà độc đáo, từ những chiếc quyển
                                sách tuyệt vời, đồ trang sức tinh xảo, cho đến
                                những sản phẩm thủ công tỉ mỉ được tạo ra bởi
                                những nghệ nhân tài năng. chúng tôi cam kết mang
                                đến cho bạn những trải nghiệm mua sắm đầy ý
                                nghĩa và độc đáo.
                            </h3>
                            <div className={cx('muangay')}>
                                Mua ngay bây giờ
                            </div>
                        </div>
                        <div
                            data-aos="fade-left"
                            data-aos-anchor="#example-anchor"
                            data-aos-offset="500"
                            data-aos-duration="1500"
                        >
                            <img src={AnhNen} className={cx('img_layout1')} />
                        </div>
                    </div>
                    {/* layout2 */}
                    <div className={cx('layout2')}>
                        <div className={cx('box_layout')}>
                            <div className={cx('box')}>
                                <div className={cx('conten')}>
                                    <div>Tặng quà 20/11</div>
                                    <h3>Các mẫu thiết kế</h3>
                                    <button>XEM TẤT CẢ</button>
                                </div>
                                <img
                                    src={Banner1}
                                    className={cx('img_conten1')}
                                />
                            </div>
                        </div>
                        <div className={cx('box_layout')}>
                            <div className={cx('box')}>
                                <div className={cx('conten')}>
                                    <div>Tặng quà 20/11</div>
                                    <h3>Các mẫu thiết kế</h3>
                                    <button>XEM TẤT CẢ</button>
                                </div>
                                <img
                                    src={Banner1}
                                    className={cx('img_conten1')}
                                />
                            </div>
                        </div>
                        <div className={cx('box_layout')}>
                            <div className={cx('box')}>
                                <div className={cx('conten')}>
                                    <div>Tặng quà 20/11</div>
                                    <h3>Các mẫu thiết kế</h3>
                                    <button>XEM TẤT CẢ</button>
                                </div>
                                <img
                                    src={Banner1}
                                    className={cx('img_conten1')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* layout3 */}

                    <div
                        className={cx('layout3')}
                        data-aos="fade-up"
                        data-aos-duration="3000"
                    >
                        <div className={cx('box_layout3')}>
                            <div className={cx('conten')}>
                                <div className={cx('SPECIAL')}>
                                    <div>
                                        <p />
                                        <span style={{}}>SPECIAL</span>
                                        <p />
                                    </div>
                                </div>
                                <div className={cx('sanphamnoibat')}>
                                    <div>SẢN PHẨM NỔI BẬT</div>
                                </div>
                                <div>
                                    <Radio.Group>
                                        <Radio.Button
                                            value="large"
                                            className={cx('Radio')}
                                        >
                                            Đồ có sẵn
                                        </Radio.Button>
                                        <Radio.Button
                                            value="default"
                                            className={cx('Radio')}
                                        >
                                            Đồ thiết kế
                                        </Radio.Button>
                                        <Radio.Button
                                            value="small"
                                            className={cx('Radio')}
                                        >
                                            Đồ yêu cầu
                                        </Radio.Button>
                                        <Radio.Button
                                            value="small"
                                            className={cx('Radio')}
                                        >
                                            Khác
                                        </Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* sản phẩm */}

                    <div
                        className={cx('sanpham')}
                        data-aos="fade-up"
                        data-aos-duration="3000"
                    >
                        <div className={cx('box_sanpham')}>
                            <div>
                                <img
                                    className={cx('img1')}
                                    src="https://scontent.fhan20-1.fna.fbcdn.net/v/t1.15752-9/396521293_1006783440383935_2187288414981548075_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=Xk3p-EptywsAX_tFAs6&_nc_ht=scontent.fhan20-1.fna&oh=03_AdTjMBglNOEw4fMNZ6DF7VxWMrxsBuub3S4HmwgAPLlRbA&oe=6561FAD2"
                                />
                            </div>
                            <div>
                                <img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t1.15752-9/395199648_180309315130090_4306085981713535823_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=ENHzEjrFlUcAX-NaQct&_nc_ht=scontent.fhan20-1.fna&oh=03_AdSTattApahW1STRmBjJr_orDqa7TRESO2pPWBf7pwU-Zg&oe=6561FB58" />
                                <img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t1.15752-9/387649231_314034171378802_3776341523214919097_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=fMrmdZ11U-kAX9HVz5J&_nc_ht=scontent.fhan20-1.fna&oh=03_AdQ5Ml9JB0b90z4_G8GeYhOnNI-sEelPfCbEjevA_90Vbg&oe=6561DEE9" />
                                <img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t1.15752-9/396543016_861047458947427_7460067975258432522_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=gm1RkP-9NCkAX8moewH&_nc_ht=scontent.fhan20-1.fna&oh=03_AdTJ2kPjjARc4tPaTUT-n4g0gkT8QpLQHO7REygBlfaPOg&oe=6561CC4F" />
                                <img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t1.15752-9/395318948_346066267837330_7552033802855889505_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=XoDuTc4uhaAAX9TLLiX&_nc_ht=scontent.fhan20-1.fna&oh=03_AdQKVxQZQ9R-qXAxxR3yR5ShOOEVV1GqVdrz5OcMHEfMbQ&oe=6561EABB" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
