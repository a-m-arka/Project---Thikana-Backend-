import { HiOutlineMapPin } from 'react-icons/hi2';
import './propertyCard.scss';
export default function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <div className="property-card__image">
        <img src={property.image} alt={property.title} />
        <span>{property.postType}</span>
      </div>
      <div className="property-card__body">
        <p className="property-card__type">{property.type}</p>
        <h3>{property.title}</h3>
        <p className="property-card__location">
          <HiOutlineMapPin /> {property.address}, {property.city}
        </p>
        <p className="property-card__price">
          ৳ {property.price}
          <small>{property.postType === 'Rent' ? ' / month' : ''}</small>
        </p>
      </div>
    </article>
  );
}
