const Marketplace = () => {
    const [resources, setResources] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [selectedResource, setSelectedResource] = React.useState(null);
    const [showRentModal, setShowRentModal] = React.useState(false);

    React.useEffect(() => {
        fetchResources();
        const socket = io();
        socket.on('resource-update', handleResourceUpdate);
        return () => socket.disconnect();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await fetch('/api/resources');
            const data = await response.json();
            if (data.success) {
                setResources(data.data);
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            setError('Failed to fetch resources');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResourceUpdate = (updatedResource) => {
        setResources(prev => prev.map(r => 
            r.id === updatedResource.id ? updatedResource : r
        ));
    };

    const handleRent = (resource) => {
        setSelectedResource(resource);
        setShowRentModal(true);
    };

    const confirmRent = async (duration) => {
        try {
            const response = await fetch('/api/resources/rent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    resourceId: selectedResource.id,
                    duration
                }),
            });
            const data = await response.json();
            if (data.success) {
                // Update local state
                handleResourceUpdate(data.data);
                setShowRentModal(false);
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            console.error('Failed to rent resource:', err);
            // Show error in UI
        }
    };

    if (loading) return <div className="text-center py-8">LOADING_RESOURCES...</div>;
    if (error) return <div className="text-center py-8 text-red-400">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map(resource => (
                    <ResourceCard 
                        key={resource.id}
                        resource={resource}
                        onRent={handleRent}
                    />
                ))}
            </div>

            {showRentModal && (
                <RentModal 
                    resource={selectedResource}
                    onConfirm={confirmRent}
                    onClose={() => setShowRentModal(false)}
                />
            )}
        </div>
    );
}; 