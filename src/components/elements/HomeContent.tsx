import { PanelsTopLeft, TabletSmartphone, Workflow } from "lucide-react";

const ServicesItems = [
    {
        id: "web-development",
        title: "Desarrollo Web",
        description: "Creamos sitios web modernos, responsivos y optimizados para SEO que impulsan tu presencia en línea.",
        icon: <PanelsTopLeft />
    },
    {
        id: "mobile-development",
        title: "Desarrollo Móvil",
        description: "Desarrollamos aplicaciones móviles nativas y multiplataforma que ofrecen experiencias de usuario excepcionales.",
        icon: <TabletSmartphone />
    },
    {
        id: "automatization",
        title: "Automatización",
        description: "Implementamos soluciones de automatización para optimizar procesos y aumentar la eficiencia operativa.",
        icon: <Workflow />
    }
];

export default function HomeContent() {
    return (
        <div className="relative w-full h-auto overflow-hidden bg-frosted-glass mt-5 rounded-lg p-10">
            <div className="relative flex flex-col items-center text-center h-full rounded-lg">
                <div className="flex flex-col items-center">
                    <h2 className="text-4xl font-bold mb-4">Nuestros Servicios</h2>
                    <div className="h-1 w-[85%] bg-accent rounded-lg" />
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-8 w-full">
                    {ServicesItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center bg-opaque-glass rounded-lg p-10 w-full md:w-[30%]"
                        >
                            <div className="bg-accent p-4 rounded-full mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-center text-sm md:text-base text-gray-300">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}