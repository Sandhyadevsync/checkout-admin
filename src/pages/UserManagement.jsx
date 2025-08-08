import { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Edit, Trash2, Eye, UserPlus, Download, Upload } from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';
import Modal from '../components/Modal';

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    // Form state for add/edit user
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        permissions: []
    });

    // Mock user data
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            status: 'Active',
            lastLogin: '2024-01-15 10:30 AM',
            createdAt: '2024-01-01',
            permissions: ['Dashboard', 'Orders', 'Reports', 'Settings']
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'Manager',
            status: 'Active',
            lastLogin: '2024-01-14 02:15 PM',
            createdAt: '2024-01-05',
            permissions: ['Dashboard', 'Orders', 'Reports']
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            role: 'Operator',
            status: 'Inactive',
            lastLogin: '2024-01-10 09:45 AM',
            createdAt: '2024-01-08',
            permissions: ['Dashboard', 'Orders']
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            role: 'Manager',
            status: 'Active',
            lastLogin: '2024-01-15 11:20 AM',
            createdAt: '2024-01-12',
            permissions: ['Dashboard', 'Orders', 'Reports']
        },
        {
            id: 5,
            name: 'David Brown',
            email: 'david.brown@example.com',
            role: 'Operator',
            status: 'Active',
            lastLogin: '2024-01-14 04:30 PM',
            createdAt: '2024-01-15',
            permissions: ['Dashboard', 'Orders']
        }
    ]);

    // Filter users based on search and filters
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Toggle user status
    const toggleUserStatus = (userId) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId
                    ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                    : user
            )
        );
    };

    // Handle edit user
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            permissions: user.permissions
        });
        setShowEditModal(true);
    };

    // Handle add user
    const handleAddUser = () => {
        setFormData({
            name: '',
            email: '',
            role: '',
            permissions: []
        });
        setShowAddUserModal(true);
    };

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle permission toggle
    const handlePermissionToggle = (permission) => {
        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions.includes(permission)
                ? prev.permissions.filter(p => p !== permission)
                : [...prev.permissions, permission]
        }));
    };

    // Handle save user (add or edit)
    const handleSaveUser = () => {
        if (selectedUser) {
            // Edit existing user
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === selectedUser.id
                        ? { ...user, ...formData }
                        : user
                )
            );
            setShowEditModal(false);
        } else {
            // Add new user
            const newUser = {
                id: Date.now(),
                ...formData,
                status: 'Active',
                lastLogin: 'Never',
                createdAt: new Date().toISOString().split('T')[0]
            };
            setUsers(prevUsers => [newUser, ...prevUsers]);
            setShowAddUserModal(false);
        }
        setSelectedUser(null);
    };

    const tableHeaders = [
        'Name',
        'Email',
        'Role',
        'Status',
        'Last Login',
        'Created Date',
        'Actions'
    ];

    const availablePermissions = ['Dashboard', 'Orders', 'Abandoned Carts', 'Finance', 'Reports', 'User Management', 'Settings'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage users and their permissions</p>
                </div>
            </div>

            {/* Filters and Actions */}
            <Card>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220] w-full sm:w-64"
                            />
                        </div>

                        {/* Role Filter */}
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                        >
                            <option value="all">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Operator">Operator</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                        >
                            <option value="all">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                            <Download size={16} />
                            <span>Export</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                            <Upload size={16} />
                            <span>Import</span>
                        </button>
                        <button
                            onClick={handleAddUser}
                            className="flex items-center space-x-2 px-4 py-2 bg-[#F58220] text-white rounded-lg hover:bg-[#E67300] transition-colors"
                        >
                            <UserPlus size={16} />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>
            </Card>

            {/* Users Table */}
            <Card>
                <div className="overflow-x-auto">
                    <Table headers={tableHeaders}>
                        {currentUsers.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-[#F58220] rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <span className="font-medium text-gray-900">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                        user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {user.role}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => toggleUserStatus(user.id)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#F58220] focus:ring-offset-2 ${user.status === 'Active' ? 'bg-[#F58220]' : 'bg-gray-200'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                    <span className={`ml-2 text-xs font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                        {user.status}
                                    </span>
                                </TableCell>
                                <TableCell>{user.lastLogin}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="p-1 text-gray-400 hover:text-[#F58220]"
                                            title="Edit"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-gray-700">
                            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1 text-sm text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Add User Modal */}
            <Modal
                isOpen={showAddUserModal}
                onClose={() => setShowAddUserModal(false)}
                title="Add New User"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                            placeholder="Enter full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                            placeholder="Enter email address"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={formData.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                        >
                            <option value="">Select role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Operator">Operator</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                            {availablePermissions.map(permission => (
                                <label key={permission} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.permissions.includes(permission)}
                                        onChange={() => handlePermissionToggle(permission)}
                                        className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                    />
                                    <span className="text-sm text-gray-700">{permission}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            onClick={() => setShowAddUserModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveUser}
                            disabled={!formData.name || !formData.email || !formData.role}
                            className="px-4 py-2 bg-[#F58220] text-white rounded-lg hover:bg-[#E67300] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add User
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit User Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Edit User"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                            placeholder="Enter full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                            placeholder="Enter email address"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={formData.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F58220] focus:border-[#F58220]"
                        >
                            <option value="">Select role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Operator">Operator</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                            {availablePermissions.map(permission => (
                                <label key={permission} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.permissions.includes(permission)}
                                        onChange={() => handlePermissionToggle(permission)}
                                        className="mr-2 text-[#F58220] focus:ring-[#F58220]"
                                    />
                                    <span className="text-sm text-gray-700">{permission}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveUser}
                            disabled={!formData.name || !formData.email || !formData.role}
                            className="px-4 py-2 bg-[#F58220] text-white rounded-lg hover:bg-[#E67300] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Update User
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserManagement;
