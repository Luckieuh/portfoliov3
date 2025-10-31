import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Politique() {
    return (
        <div className="w-full min-h-screen dark:bg-neutral-900 bg-neutral-100 overflow-x-hidden pt-[10vh]">
            <Header />
            <h1 className='text-7xl font-black flex justify-center'>Politique de confidentialité</h1>

            <div className='w-full flex flex-col justify-start md:px-20 lg:px-40 px-4 mt-10'>

                {/* OBJET DE LA POLITIQUE */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>1. Objet de la politique</h2>
                    <p className='text-lg'>
                        La présente politique de confidentialité a pour objectif de vous informer de la manière dont vos données personnelles sont collectées, traitées et protégées lorsque vous utilisez le site.
                    </p>
                </div>
                {/* DONNEES COLLECTEES */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>2. Données collectées</h2>
                    <p className='text-lg'>
                        Lors de l’utilisation du formulaire de contact, les données suivantes peuvent être collectées :                    
                    </p>
                    <ul className='list-disc list-inside mt-2'>
                        <li>Nom</li>
                        <li>Prénom</li>
                        <li>Adresse e-mail</li>
                        <li>Message</li>
                    </ul>
                    <p>Aucune autre donnée personnelle n’est collectée, stockée ou exploitée sans votre consentement explicite.</p>
                </div>
                {/* FINALITES DU TRAITEMENT */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>3. Finalités du traitement</h2>
                    <p className='text-lg'>
                        Les informations collectées sont utilisées dans le but exclusif de :
                    </p>
                    <ul className='list-disc list-inside mt-2'>
                        <li>répondre à vos messages et demandes de renseignements,</li>
                        <li>éventuellement vous recontacter.</li>
                    </ul>
                    <p>
                        Elles ne sont jamais exploitées à des fins commerciales ou publicitaires.
                    </p>
                </div>
                {/* BASE LEGALE */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>4. Base légale</h2>
                    <p className='text-lg'>
                        Le traitement de vos données repose sur :
                    </p>
                    <ul className='list-disc list-inside mt-2'>
                        <li>votre consentement (RGPD — article 6-1-a).</li>
                    </ul>
                </div>
                {/* DUREE DE CONSERVATION */}
                <div className='mx-4 mt-10justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>5. Durée de conservation</h2>
                    <p className='text-lg'>
                        Vos données sont conservées pour une durée maximale de 3 ans à compter de votre dernier contact, puis supprimées automatiquement.
                    </p>
                </div>
                {/* DESTINATAIRES */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>6. Destinataires</h2>
                    <p className='text-lg'>
                        Vos données ne sont communiquées à aucun tiers en dehors de l’éditeur, sauf éventuelle contrainte légale.
                    </p>
                </div>
                {/* HEBERGEMENT ET STOCKAGE */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>7. Hébergement et stockage</h2>
                    <p className='text-lg'>
                        Les données issues du formulaire de contact sont stockées sur les serveurs de :
                    </p>
                    <ul className='list-disc list-inside mt-2'>
                        <li><a href="https://neon.com/">Neon</a> pour la base de données,</li>
                        <li><a href="https://vercel.com/">Vercel</a> pour l’hébergement du Site.</li>
                    </ul>
                    <p>
                        Ces fournisseurs mettent en œuvre des mesures techniques et organisationnelles visant à protéger les données.
                    </p>
                </div>

                {/* SECURITE */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>8. Sécurité</h2>
                    <p className='text-lg'>
                        L’éditeur s’engage à déployer toutes les mesures raisonnables pour :
                    </p>
                    <ul className='list-disc list-inside mt-2'>
                        <li>préserver la confidentialité des informations,</li>
                        <li>éviter toute perte, altération, divulgation ou accès non autorisé.</li>
                    </ul>
                    <p>
                        Cependant, aucun système n’est totalement infaillible.
                    </p>
                </div>
                {/* DROITS DES UTILISATEURS */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>9. Droits des utilisateurs</h2>
                    <p className='text-lg'>
                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                    </p>
                    <ul className='list-disc list-inside mt-2'>
                        <li>droit d’accès,</li>
                        <li>droit de rectification,</li>
                        <li>droit d’effacement,</li>
                        <li>droit d’opposition,</li>
                        <li>droit à la limitation du traitement,</li>
                        <li>droit à la portabilité.</li>
                    </ul>
                    <p>
                        Pour exercer ces droits, vous pouvez envoyer un message à : <a href="mailto:lucsar.pro@gmail.com">lucsar.pro@gmail.com</a>
                    </p>
                    <p>
                        Une réponse vous sera adressée dans un délai maximal de 30 jours.
                    </p>
                </div> 
                {/* TRANSFERT HORS UE */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>10. Transfert hors Union européenne</h2>
                    <p className='text-lg'>
                        Certains services (hébergement, base de données) peuvent impliquer un transfert de données vers les États-Unis. Ces transferts sont encadrés par des garanties conformes au RGPD.
                    </p>
                </div>
                {/* COOKIES */} 
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>11. Cookies</h2>
                    <p className='text-lg'>
                        À ce jour, le site ne recourt pas à des cookies de traçage ou marketing.
                    </p>
                    <p>
                        L’utilisateur peut configurer son navigateur pour refuser tout cookie.
                    </p>
                </div>
                {/* MODIFICATION DE LA POLITIQUE */}
                <div className='mx-4 mt-10 justify-start text-lg'>
                    <h2 className='font-bold text-3xl mb-2'>12. Modification de la politique</h2>
                    <p className='text-lg'>
                        L’éditeur se réserve le droit de modifier la présente politique à tout moment dans le cadre de l’évolution du site ou de la réglementation.
                    </p>
                    <p>
                        La dernière mise à jour a été effectuée le : 31/10/2025.
                    </p>
                </div>
            </div>
            <Footer />         
        </div>
    );
}