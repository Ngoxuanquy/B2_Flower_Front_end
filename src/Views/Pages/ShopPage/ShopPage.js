import React,{useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import styles from './shoppage.module.scss';
import { Card, Shop_Left } from '../../../Components';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
const cx = classNames.bind(styles);

const ShopPage = () => {

    useEffect(() => {
        AOS.init();
    },[])

    //fake list product
    const lists = [
        {
            id: 1,
            img: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/370225831_3676239955941314_7161542285842422241_n.jpg?stp=dst-jpg_p206x206&_nc_cat=110&ccb=1-7&_nc_sid=510075&_nc_eui2=AeEqdsuMrBq1rWGE0kB3YWU4eiwgK2-9lxx6LCArb72XHJm1lKNneUaRZyosqzsohaZ-mb3GM-0uIicGoSp7Zz94&_nc_ohc=hHDgHvia3JQAX8e7mTB&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdT4dSjcABFLtd0TEyXx3BDopIjlw0HjCt37wfPmWWgv4g&oe=65636642',
            name: 'sản phâm 1',
            price: 100,
        },
        {
            id: 2,
            img: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/395577565_6926701344053995_1769440315928249527_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHjN-4fo158vFG7RzgZQllrPZWimD_gPRI9laKYP-A9EuctaMsUB42JTGp5V782hzhlJe-GrCeGyctgiqfjyysA&_nc_ohc=3KeYa_-ZnUYAX9xT_Io&_nc_ht=scontent.fhan14-1.fna&oh=03_AdSGdnCnHyho4EfIo7o8h-IwH1E9YGwBnJ2vx1h4BLq0Kw&oe=656341C0',
            name: 'sản phâm 2',
            price: 200,
        },
        {
            id: 3,
            img: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/369842289_847831003546579_1212834127400835549_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeE7GtcCthBifKKWhCQGwf8z_n1HKW542rn-fUcpbnjauXt6koBUxH_Rl8c86Sz39oAQGAZCC2KtFqFMs06u__8E&_nc_ohc=ALZGhpjDvaMAX8mrRew&_nc_ht=scontent.fhan14-2.fna&oh=03_AdTURaSBPiHMtQ-JJ_j77ocU8rcL0M7e4OBEmTKzGexnQA&oe=65635AC9',
            name: 'sản phâm 3',
            price: 300,
        },
        {
            id: 4,
            img: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/370196239_297830479846145_8825192006366784045_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEv2wUcWeeTDeqp56BbU7cdDTOpsEUF_NANM6mwRQX80Jy11zzO14-2eM31gVy1c6Sqaf4De0-kEyDueGx91Wa_&_nc_ohc=wxAn0xJfAAQAX9EnRTz&_nc_ht=scontent.fhan14-3.fna&oh=03_AdRfxCgGjWXzj1R4AhckRR3qzq2y7_iA7q_AAOcofcv-dQ&oe=656360A1',
            name: 'sản phâm 4',
            price: 400,
        },
        {
            id: 5,
            img: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t1.15752-9/396518694_771008088123916_4957748953599361065_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeF39CN1AensZaqNKNjpMZJcLR3Ks_Xl4HotHcqz9eXgemnFrnbu91tmC8e7wFp3w0scocg9bXuZiifs-VReMF1K&_nc_ohc=tAaOvVrg7EgAX-f0m_l&_nc_ht=scontent.fhan14-4.fna&oh=03_AdRTy65BrxVOYARZStfxM6aGnkj-W05NkXuDBBHK-L5mRg&oe=65637144',
            name: 'sản phâm 5',
            price: 500,
        },
        {
            id: 6,
            img: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/370126303_629346969406459_6473177226124283458_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGKP46o6ZUfZA-AvxVgphyL457L-gDUlCvjnsv6ANSUK1p-O7Vic0d1rxY7RZM1viTVWeoCQVSl_Lx4pHKaK83Q&_nc_ohc=zP1poCeQ6p0AX9EZNtm&_nc_ht=scontent.fhan14-1.fna&oh=03_AdRu0qcJ0SsdmoETbVM6ZazwLNFoTiuCC5smPsZbXenTFg&oe=656351AE',
            name: 'sản phâm 6',
            price: 600,
        },
        {
            id: 7,
            img: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t1.15752-9/395453207_171425679307927_6121801529067387352_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGUiLJFO-XObxhKDsDlik9hpgKkjWUlOqqmAqSNZSU6qv_hzNcy2YBxdQNcFcHXjytZ46ylkfXhU6iv8UjRegDG&_nc_ohc=3eTJ-M5GXmUAX_X9rcJ&_nc_ht=scontent.fhan14-4.fna&oh=03_AdTmhkR1PNLrNxR9omUTpia2-AWjs90ZKxSvk1D5HPmI5g&oe=65633EAE',
            name: 'sản phâm 7',
            price: 700,
        },
        {
            id: 8,
            img: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/387641583_265732942628704_9003011310122567851_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFU6vRUIgie8RO1P_fVzKE4lWJDAs1s0EKVYkMCzWzQQnpHCvs5avjwstq22f06A_ZdJn_o3sj80QUPHnDdfyjq&_nc_ohc=wBjavy4PeeoAX87aKzU&_nc_ht=scontent.fhan14-1.fna&oh=03_AdTEV8devIAZXZWb2DyrHPbxr5Ztyrb4Xk7oEse9eh8fOA&oe=656343C3',
            name: 'sản phâm 8',
            price: 800,
        },
        {
            id: 9,
            img: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/370721500_873189441123422_7824064343062004522_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEDcYGsNZTCXTtCwV3TPfX5dKBzkLNG3mF0oHOQs0beYQC84JTSO6h7vvbUPp4FZGUtkudZGQpwhAo6x05SdU6S&_nc_ohc=ZBsu6275DwEAX_RAyP9&_nc_ht=scontent.fhan14-1.fna&oh=03_AdREId4cdT2qoM-54y9uN-UV-hxU5oyE66Oz_1qiHz7DFQ&oe=65634505',
            name: 'sản phâm 9',
            price: 900,
        },
        {
            id: 10,
            img: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/395352989_204144012631385_7296511929375041197_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFDB35cUkh4PHX2NijaMpci4_jMKTttBefj-MwpO20F55ltxLKuKrPMYDKEeDqFKvJ2kNst1PuOg2dtf__8036D&_nc_ohc=jJ8jfakKiroAX_TLjF5&_nc_ht=scontent.fhan14-2.fna&oh=03_AdTTf_NRvmjH7RZWCAR1NL7ARHiJhzI9yAC6I9R6zSnicw&oe=65634E47',
            name: 'sản phâm 10',
            price: 1000,
        },
    ];

   

    return (
        <div className={cx('container_')}>
            <div className="container_">
                <div className={cx('shop-has-sidebar')}>
                    <div className={cx('nova-page-header__overlay')}>
                        <div>
                            <h1>Shop</h1> <br />
                            <p>Trang Chủ | Shop</p>
                        </div>
                    </div>

                    {/* Layout  */}
                    <div className={cx('layout')}>
                        <div className={cx('box')}>
                            {/* left */}
                            <div className={cx('left')}>
                                <Shop_Left />
                            </div>
                            {/* right */}
                            <div className={cx('right')}>
                                {lists.map((list, index) => (
                                    <div
                                    key={list.id}
                                    data-aos="fade-left"
                                    data-aos-anchor="#example-anchor"
                                    data-aos-duration={(index + 1) * 1000}
                                  >
                                    <Card list={list}
                                    />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
