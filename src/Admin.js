import { useEffect, useState } from 'react';
import { BarChart3, LogOut, Plus, Save, Trash2 } from 'lucide-react';
import { createContent, deleteContent, getContents, getDashboard, updateContent } from './api';
import { getCurrentUser, logout } from './api';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const moduleDefinitions = {
  about: { label: 'À propos / compétence', fields: [['title', 'Titre'], ['text', 'Texte']] },
  diplomas: { label: 'Diplôme / formation', fields: [['year', 'Année'], ['title', 'Titre du diplôme'], ['description', 'Description']] },
  experiences: { label: 'Expérience', fields: [['year', 'Année / période'], ['title', 'Titre'], ['description', 'Description']] },
  technologies: { label: 'Technologie', fields: [['title', 'Nom de la technologie'], ['percentage', 'Niveau (%)', 'number']] },
  projects: { label: 'Projet', fields: [['title', 'Titre'], ['description', 'Description'], ['image', 'Image (URL facultative)'], ['link', 'Lien (URL facultative)']] },
  certificates: { label: 'Certificat', fields: [['title', 'Titre'], ['description', 'Description'], ['image', 'Image (URL facultative)'], ['link', 'Lien (URL facultative)']] },
};
const modules = Object.keys(moduleDefinitions);
const emptyContent = { module: 'about', title: '', payload: {}, published: true };

const newContent = (module = 'about') => ({ module, title: '', payload: Object.fromEntries(moduleDefinitions[module].fields.map(([name]) => [name, ''])), published: true });

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [content, setContent] = useState(newContent());
  const [items, setItems] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const loadDashboard = () => Promise.all([getDashboard(), getContents()]).then(([stats, grouped]) => {
    setDashboard(stats);
    setItems(Object.values(grouped).flat());
  }).catch(() => setMessage('Connectez-vous pour accéder au tableau de bord.'));
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user.role !== 'admin') navigate('/');
      else { setAuthenticated(true); loadDashboard(); }
    }).catch(() => navigate('/login'));
  }, [navigate]);

  const save = async (event) => {
    event.preventDefault();
    try {
      const saved = content.id
        ? await updateContent(content.id, content)
        : await createContent(content);
      setItems((current) => [saved, ...current.filter((item) => item.id !== saved.id)]);
      setContent(newContent(content.module));
      setMessage('Publication enregistrée.');
    } catch (error) { setMessage('Impossible d’enregistrer cette publication.'); }
  };

  if (!authenticated) return <main className="admin-shell"><div className="admin-login"><BarChart3 size={34} /><h1>Vérification...</h1><p>{message}</p></div></main>;

  const handleLogout = async () => { await logout(); navigate('/'); };

  const definition = moduleDefinitions[content.module];
  const updateField = (field, value) => setContent({ ...content, payload: { ...content.payload, [field]: value }, ...(field === 'title' ? { title: value } : {}) });

  return <main className="admin-shell"><header className="admin-header"><div><span className="admin-kicker">Portfolio / Pilotage</span><h1>Tableau de bord</h1></div><div className="admin-header-actions"><BarChart3 size={30} /><button type="button" onClick={handleLogout} title="Se déconnecter"><LogOut size={17} /> Déconnexion</button></div></header>
    <section className="metrics-grid">{[['Visites totales', dashboard?.total_visits], ['Clics projets', dashboard?.project_clicks], ['Clics certificats', dashboard?.certificate_clicks], ['Téléchargements CV', dashboard?.cv_downloads]].map(([label, value]) => <article className="metric" key={label}><strong>{value ?? 0}</strong><span>{label}</span></article>)}</section>
    <section className="admin-columns"><form className="content-editor" onSubmit={save}><div className="editor-heading"><h2>{content.id ? 'Modifier une publication' : 'Nouvelle publication'}</h2><button type="button" className="icon-button" title="Nouvelle publication" onClick={() => setContent(newContent(content.module))}><Plus size={18} /></button></div><select value={content.module} onChange={(event) => setContent(newContent(event.target.value))}>{modules.map((module) => <option key={module} value={module}>{moduleDefinitions[module].label}</option>)}</select>{definition.fields.map(([field, label, type]) => <label key={field} className="content-field">{label}<input type={type || 'text'} min={type === 'number' ? 0 : undefined} max={type === 'number' ? 100 : undefined} value={content.payload[field] ?? ''} onChange={(event) => updateField(field, event.target.value)} required={field !== 'image' && field !== 'link'} /></label>)}<label className="publish-toggle"><input type="checkbox" checked={content.published} onChange={(event) => setContent({ ...content, published: event.target.checked })} /> Publié sur le portfolio</label><button type="submit"><Save size={17} /> Publier ce module</button><p>{message}</p></form><section className="module-report"><h2>Activité par module</h2>{(dashboard?.visits_by_module || []).map((item) => <div className="report-row" key={item.module}><span>{item.module || 'non défini'}</span><strong>{item.total}</strong></div>)}<h2 className="report-title">Publications</h2>{items.map((item) => <div className="report-row" key={item.id}><button type="button" className="plain-button" onClick={() => setContent({ ...item, payload: item.payload || {} })}>{item.title || item.payload?.title || item.module}</button><button type="button" className="danger-button" onClick={() => deleteContent(item.id).then(() => setItems(items.filter((entry) => entry.id !== item.id)))} title="Supprimer"><Trash2 size={15} /></button></div>)}</section></section></main>;
}
