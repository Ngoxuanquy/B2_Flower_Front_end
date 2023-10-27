import React from 'react';
import classNames from 'classnames/bind';
import styles from './LienHe.module.scss';

const cx = classNames.bind(styles);

const LienHe = () => {
    return (
        <div className={cx('container')}>
            <div className='container'>
                <div className={cx('box-layout')}>
                    <div className={cx('layout')}>
                        <div>
                          <img className={cx('img_layout1')} src='https://static.vinwonders.com/production/qua-tang-vip-1.jpg' />
                        <div className={cx('contac')}>
                        Liên Hệ
                        </div>
                    </div>

                    {/* Conten */}
                    <div className={cx('conten')}>
                        <div className={cx('text-conten')}>
                        Xe đạp điện tử của chúng tôi cho phép bạn khám phá nhiều ngọn núi hơn và vượt qua nhiều vòng đua hơn bao giờ hết. Cảm giác tự nhiên, khả năng tăng tốc phù hợp với đường mòn sẽ giúp bạn leo lên và cho phép bạn trở thành con thoi của riêng mình.
                        </div>
                    </div>

                    {/* Lieen hee */}
                    <div className={cx('LienHe')}>
                        <div className={cx('Layout-lienhe')}>
                            <div>
                                Ghe tham dia diem
                                <span>
                                    51, ngox 252, Trinh dinh cuu, Hoang Mai, HN
                                </span>
                            </div>
                            <div>
                                Hay goi cho chung toi
                                <span>
                                    0332062668
                                </span>
                            </div>
                            <div>
                                Tim kiem cong viec
                                <span>
                                    Email: ngoxuanquy1812@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* map */}

                    <div>
                        <div>
                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LienHe;