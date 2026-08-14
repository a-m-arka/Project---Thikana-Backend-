import { useEffect, useState } from 'react';
import { HiOutlinePlus, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { useAuth } from '../../context/AuthContext';
import './myProperties.scss';
const emptyForm = { title: '', address: '', city: '', price: '', type: 'flat', description: '' };
export default function MyProperties() {
  const { token, apiUrl } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch(`${apiUrl}/property/user-properties`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => setProperties(data.properties || []))
      .catch(() => setMessage('Could not load your properties. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [apiUrl, token]);
  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    files.forEach((file) => data.append('files', file));
    try {
      const r = await fetch(`${apiUrl}/property/register-property`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const result = await r.json();
      if (!r.ok) throw new Error(result.message);
      setMessage(result.message);
      setShowForm(false);
      setForm(emptyForm);
      setFiles([]);
    } catch (err) {
      setMessage(err.message);
    }
  };
  return (
    <div className="page properties-page">
      <div className="properties-page__header">
        <div>
          <p className="eyebrow">Your listings</p>
          <h1>My Properties</h1>
          <p>Manage property details, photos, and listing status in one place.</p>
        </div>
        <button className="button" onClick={() => setShowForm(!showForm)}>
          <HiOutlinePlus /> Add Property
        </button>
      </div>
      {showForm && (
        <form className="property-form" onSubmit={submit}>
          <h2>Add a property</h2>
          <div className="form-grid">
            <label>
              Title
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>
            <label>
              Address
              <input
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </label>
            <label>
              City
              <input
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </label>
            <label>
              Price
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </label>
            <label>
              Property type
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="flat">Flat</option>
                <option value="house">House</option>
                <option value="commercial">Commercial</option>
              </select>
            </label>
            <label>
              Images (up to 10)
              <input
                type="file"
                required
                accept="image/*"
                multiple
                onChange={(e) => setFiles([...e.target.files].slice(0, 10))}
              />
            </label>
          </div>
          <label>
            Description
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>
          <button className="button">Save property</button>
        </form>
      )}
      {message && <p className="notice">{message}</p>}
      {loading ? (
        <p className="loading">Loading your properties…</p>
      ) : properties.length ? (
        <div className="my-property-list">
          {properties.map((p) => (
            <article key={p.property_id}>
              <div>
                <h3>{p.title}</h3>
                <p>
                  {p.city} · ৳ {p.price}
                </p>
              </div>
              <div className="property-actions">
                <button title="Edit">
                  <HiOutlinePencilSquare />
                </button>
                <button title="Delete">
                  <HiOutlineTrash />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No properties yet</h2>
          <p>Add your first property to start managing your listing.</p>
          <button className="button" onClick={() => setShowForm(true)}>
            Add Property
          </button>
        </div>
      )}
    </div>
  );
}
