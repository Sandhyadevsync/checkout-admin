const Card = ({ children, className = '', title, subtitle, action }) => {
    return (
        <div className={`card ${className}`}>
            {(title || action) && (
                <div className="flex items-center justify-between mb-3">
                    <div>
                        {title && <h3 className="section-title">{title}</h3>}
                        {subtitle && <p className="section-subtitle">{subtitle}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card; 