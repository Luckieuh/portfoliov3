import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Propos() {
    return (
        <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100 overflow-x-hidden pt-[10vh]">
            <Header />
            <h1 className='text-7xl font-black flex justify-center'>Mentions légales</h1>

            <div className='w-full flex flex-col justify-start md:px-20 lg:px-40 px-4 mt-10'>

                {/* EDITEUR DU SITE */}
                <div className='mx-4 mt-10justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>1. Éditeur du site</h2>
                    <p className='text-lg'>
                        Le site internet accessible à l’adresse www.lucsar.fr est édité par : Lucas Thomassin
                    </p>
                    <p>
                    <strong>Adresse :</strong> 309 Rue de Bordeaux, 16000 Angoulême, France
                    </p>
                    <p>
                    <strong>Adresse e-mail :</strong> lucsar.pro@gmail.com
                    </p>
                </div>
                {/* HEBERGEMENT */}
                <div className='mx-4 mt-10 text-lg justify-start'>
                    <h2 className='font-bold text-3xl mb-2'>2. Hébergement</h2>
                    <p className='text-lg'>
                        Le Site est hébergé par la société : <strong>Vercel Inc.</strong>
                    </p>
                    <p>
                    <strong>Adresse :</strong> 440 N Barranca Avenue #4133
                    </p>
                    <p>
                    Covina, CA 91723
                    </p>
                    <p>
                    États-Unis
                    </p>
                    <p> <strong>Site web :</strong> https://vercel.com</p>
                </div>
                {/* STOCKAGE DES DONNEES */}
                <div className='mx-4 mt-10 text-lg justify-start'>
                    <h2 className='font-bold text-3xl mb-2'>3. Stockage des données</h2>
                    <p className='text-lg'>
                        Les données des réalisations présentées sur le site sont stockées via la solution : <strong>Neon</strong>
                    </p>
                    <p>
                    <strong>Site web :</strong> https://neon.tech
                    </p>
                </div>
                {/* PROPRIETE INTELECTUELLE */}
                <div className='mx-4 mt-10 text-lg justify-start'>
                    <h2 className='font-bold text-3xl mb-2'>4. Propriété intellectuelle</h2>
                    <p className='text-lg'>
                        L’ensemble des éléments présents sur le Site, notamment les textes, images, graphismes, logos, icônes, sons, logiciels, ainsi que leur mise en forme, sont protégés par les lois en vigueur relatives à la propriété intellectuelle.
                    </p>
                    <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie du Site, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable de l’éditeur.
                    </p>
                </div>
                {/* RESPONSABILITE */}
                <div className='mx-4 mt-10 text-lg justify-start'>
                    <h2 className='font-bold text-3xl mb-2'>5. Responsabilité</h2>
                    <p className='text-lg'>
                        L’éditeur décline toute responsabilité concernant :
                    </p>
                    <ul className='list-disc list-inside'>
                        <li>Les interruptions ou difficultés de fonctionnement du site.</li>
                        <li>Les dommages résultant d’une intrusion frauduleuse d’un tiers ayant entraîné une modification des informations diffusées sur le site.</li>
                        <li>Les conséquences directes ou indirectes liées à l’utilisation du site et des informations y figurant.</li>
                    </ul>   
                    <p>
                        L’utilisateur est seul responsable de son équipement informatique et de sa connexion Internet.
                    </p>
                </div>
                {/* LIENS HYPERTEXTES */}
                <div className='mx-4 mt-10 text-lg justify-start'>
                    <h2 className='font-bold text-3xl mb-2'>6. Liens hypertextes</h2>
                    <p className='text-lg'>
                        La présence de liens vers d’autres sites web ne garantit pas la qualité de leurs contenus, ni leur disponibilité. L’éditeur ne peut être tenu pour responsable du contenu de ces sites.
                    </p>
                </div>
                {/* COOKIES */}
                <div className='mx-4 mt-10 text-lg justify-start'>
                    <h2 className='font-bold text-3xl mb-2'>7. Cookies</h2>
                    <p className='text-lg'>
                        Le site n’utilise pas de cookies destinés au suivi marketing. Des cookies techniques peuvent toutefois être utilisés afin d’assurer un bon fonctionnement du site et améliorer l'expérience utilisateur.
                    </p>
                </div>
                {/* DROIT APPLICABLE */}
                <div className='mx-4 mt-10 text-lg justify-start mb-15'>
                    <h2 className='font-bold text-3xl mb-2'>8. Droit applicable</h2>
                    <p className='text-lg'>
                        Les présentes mentions légales sont régies par le droit français.
                        En cas de litige, et à défaut de résolution amiable, seuls les tribunaux français seront compétents.                    </p>
                </div>

            
            </div>
            <Footer />         
        </div>
    );
}