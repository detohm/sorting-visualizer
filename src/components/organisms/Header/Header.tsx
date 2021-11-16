import { Link } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import RangeSlider from '../../atoms/RangeSlider/RangeSlider';
import styles from './Header.module.css';
const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.title}><Link to="/">Sorting Visualizer</Link></div>
            <RangeSlider min={1} max={100} />
            <Button label="Start Sorting!" />
            <nav className={styles.nav}>
                <Link to="/merge-sort">Merge Sort</Link>
                <Link to="/quick-sort">Quick Sort</Link>
            </nav>
        </div>
    );
};

export default Header;