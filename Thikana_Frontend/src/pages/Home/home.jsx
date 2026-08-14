import { Link } from 'react-router-dom';
import {
  HiArrowRight,
  HiOutlineBuildingOffice2,
  HiOutlineKey,
  HiOutlineMapPin,
} from 'react-icons/hi2';
import PropertyCard from '../../components/PropertyCard/propertyCard';
import { featuredProperties } from '../../data/properties';
import './home.scss';
export default function Home() {
  return (
    <div className="page home">
      <section className="home__welcome">
        <div>
          <p className="eyebrow">Welcome to Thikana</p>
          <h1>Find a space that fits your life.</h1>
          <p>Explore homes and spaces from trusted members across Bangladesh.</p>
          <Link to="/app/explore" className="button">
            Explore properties <HiArrowRight />
          </Link>
        </div>
        <div className="home__stats">
          <span>
            <HiOutlineBuildingOffice2 />
            <strong>500+</strong>
            <small>Active listings</small>
          </span>
          <span>
            <HiOutlineMapPin />
            <strong>20+</strong>
            <small>Cities covered</small>
          </span>
          <span>
            <HiOutlineKey />
            <strong>Simple</strong>
            <small>Property management</small>
          </span>
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Fresh picks</p>
            <h2>Recently listed</h2>
          </div>
          <Link to="/app/explore">
            View all <HiArrowRight />
          </Link>
        </div>
        <div className="property-grid">
          {featuredProperties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}
