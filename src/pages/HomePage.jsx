import React from "react";
import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div id="home-page" className="container">
            <header id="main-header">
                <div id="header-left">
                    <h1 className="large-heading">
                        FIND YOUR NEXT TECH MENTORING GIG TODAY
                    </h1>
                    <Link to="/signup"><button className="btn">Join Binary</button></Link>
                </div>
                <div id="header-right">
                    <div id="header-right-image">
                        <img src={window.location.origin + "/mentor.png"}></img>
                    </div>
                </div>
            </header>

            <section>
                <h2>What is Binary?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, nihil aperiam optio sit quae, asperiores, recusandae ut laudantium natus corrupti similique accusantium animi eum tempore nobis eaque. Unde ipsum, odit omnis debitis qui placeat quos, reiciendis corporis exercitationem illo dicta, a quia excepturi nesciunt aliquam veniam voluptatem tempora ex incidunt.</p>
            </section>
        </div>
    );
};

export default HomePage