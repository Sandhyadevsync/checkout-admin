const Card = ({ children, className = '', title, subtitle, action }) => {
    return (
        <div className={`card ${className}`}>
            {(title || action) && (
                <div className="flex items-center justify-between mb-4">
                    <div>
                        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
                        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card; 