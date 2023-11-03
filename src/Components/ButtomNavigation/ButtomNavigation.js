import React, { useState } from 'react';
import './ButtomNavigation.css';
import { Link, useNavigate } from 'react-router-dom';

function ButtomNavigation() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        navigate(tab);
    };

    const tabData = [
        { label: '/', icon: 'home' },
        { label: '/shop', icon: 'shopping_bag' },
        { label: '/blog', icon: 'plumbing' },
        { label: '/cart', icon: 'business' },
        { label: '/lienhe', icon: 'help_outline' },
    ];

    return (
        <div className="container stage">
            <div className="container">
                <div className={`tabbar tab-style1 ${activeTab}`}>
                    <ul className="flex-center">
                        {tabData.map((tabItem) => (
                            <li
                                key={tabItem.label}
                                className={
                                    activeTab === tabItem.label ? 'active' : ''
                                }
                                onClick={() => handleTabClick(tabItem.label)}
                                data-where={tabItem.label}
                            >
                                <span className="material-icons-outlined">
                                    {tabItem.icon}
                                </span>
                            </li>
                        ))}
                        <li className="follow"></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ButtomNavigation;
