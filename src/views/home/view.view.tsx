import { Link } from "react-router-dom";
import { Views } from "../../routes";

const HomeView = () => {
    return <div className="home-view">
        <section>
            <h2>动态效果</h2>
            <ul>{
                Views.map(view => {
                    const { type, name } = view;
                    const key = `${type}/${name}`
                    return <li className="view-item" key={key}><Link to={key}>{view.title}</Link></li>
                })}</ul>
        </section>
    </div>
}

export default HomeView;