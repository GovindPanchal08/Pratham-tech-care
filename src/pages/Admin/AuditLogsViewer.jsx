import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import {
  History,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader,
  Eye,
  X,
  Calendar,
  User,
  Activity,
} from 'lucide-react';

export default function AuditLogsViewer() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [tableFilter, setTableFilter] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedLog, setSelectedLog] = useState(null);

  // Fetch Audit Logs
  const { data: logsData = [], isLoading } = useQuery({
    queryKey: ['admin-audit-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Unique tables list for filter
  const tables = [...new Set(logsData.map((log) => log.table_name))];

  // Filtering
  const filteredLogs = logsData.filter((log) => {
    const matchesSearch =
      (log.performed_by_email && log.performed_by_email.toLowerCase().includes(search.toLowerCase())) ||
      (log.record_id && log.record_id.toLowerCase().includes(search.toLowerCase())) ||
      (log.table_name && log.table_name.toLowerCase().includes(search.toLowerCase()));

    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesTable = tableFilter === 'all' || log.table_name === tableFilter;

    return matchesSearch && matchesAction && matchesTable;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getActionClass = (action) => {
    switch (action) {
      case 'INSERT':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25';
      case 'UPDATE':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/25';
      case 'DELETE':
        return 'bg-red-500/10 text-red-500 border-red-500/25';
      default:
        return 'bg-border text-text-secondary border-transparent';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-text-primary">System Audit Logs</h1>
        <p className="text-xs text-text-secondary">
          Track creating, updating, and deleting events across database modules.
        </p>
      </div>

      {/* Filter panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-bg-subtle border border-border p-4 rounded-xl">
        <div className="relative md:col-span-2">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/50">
            <Search size={15} />
          </span>
          <input
            type="text"
            placeholder="Search logs by email, record ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input-field pl-10 py-2 text-xs"
          />
        </div>

        <div>
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="w-full px-3.5 py-2 text-xs font-semibold bg-bg border border-border rounded-lg text-text-secondary focus:outline-none"
          >
            <option value="all">All Actions</option>
            <option value="INSERT">INSERT</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <div>
          <select
            value={tableFilter}
            onChange={(e) => {
              setTableFilter(e.target.value);
              setPage(1);
            }}
            className="w-full px-3.5 py-2 text-xs font-semibold bg-bg border border-border rounded-lg text-text-secondary focus:outline-none"
          >
            <option value="all">All Modules</option>
            {tables.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader size={24} className="animate-spin text-accent" />
          <span className="text-xs text-text-secondary">Loading audit logs...</span>
        </div>
      ) : paginatedLogs.length === 0 ? (
        <div className="bg-bg-subtle border border-border rounded-xl py-12 text-center text-xs text-text-secondary">
          No audit logs found. Write operations automatically record history entries here.
        </div>
      ) : (
        <div className="bg-bg border border-border rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-subtle border-b border-border text-[10px] font-bold tracking-widest uppercase text-text-secondary">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Table</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Record ID</th>
                  <th className="px-6 py-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-bg-subtle/40 transition-colors">
                    <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-1.5 py-0.5 border rounded font-mono font-bold text-[9px] ${getActionClass(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-accent">
                      {log.table_name}
                    </td>
                    <td className="px-6 py-4 text-text-primary truncate max-w-[150px]">
                      {log.performed_by_email || 'System'}
                    </td>
                    <td className="px-6 py-4 font-mono text-text-secondary truncate max-w-[120px]">
                      {log.record_id}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="inline-flex items-center gap-1.5 text-accent hover:underline font-semibold"
                      >
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
              <span>
                Showing {(page - 1) * itemsPerPage + 1} to{' '}
                {Math.min(page * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-1 border border-border hover:bg-bg-subtle rounded disabled:opacity-45"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="p-1 border border-border hover:bg-bg-subtle rounded disabled:opacity-45"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* JSON Difference Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-bg border border-border w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-bg-subtle">
              <div className="flex items-center gap-2">
                <History className="text-accent" size={18} />
                <div>
                  <h3 className="font-headings font-bold text-sm text-text-primary leading-tight">
                    Audit Log Details
                  </h3>
                  <p className="text-[10px] text-text-secondary mt-0.5">
                    Record ID: {selectedLog.record_id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-text-secondary">
              {/* Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-border p-4 rounded-xl bg-bg-subtle">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-text-secondary" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-text-secondary block font-semibold">
                      Timestamp
                    </span>
                    <span className="text-text-primary font-medium">
                      {new Date(selectedLog.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User size={15} className="text-text-secondary" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-text-secondary block font-semibold">
                      Operator
                    </span>
                    <span className="text-text-primary font-medium truncate block max-w-[150px]">
                      {selectedLog.performed_by_email || 'System'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-text-secondary" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-text-secondary block font-semibold">
                      Action / Target
                    </span>
                    <span className="text-text-primary font-medium">
                      {selectedLog.action} on {selectedLog.table_name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data Diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before */}
                <div className="flex flex-col h-[280px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                    State Before (OLD_DATA)
                  </span>
                  <div className="flex-1 bg-bg border border-border rounded-xl p-4 overflow-auto font-mono text-[11px] leading-relaxed">
                    {selectedLog.old_data ? (
                      <pre className="text-text-primary">
                        {JSON.stringify(selectedLog.old_data, null, 2)}
                      </pre>
                    ) : (
                      <span className="text-text-secondary italic">None (Insert Action)</span>
                    )}
                  </div>
                </div>

                {/* After */}
                <div className="flex flex-col h-[280px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                    State After (NEW_DATA)
                  </span>
                  <div className="flex-1 bg-bg border border-border rounded-xl p-4 overflow-auto font-mono text-[11px] leading-relaxed">
                    {selectedLog.new_data ? (
                      <pre className="text-text-primary">
                        {JSON.stringify(selectedLog.new_data, null, 2)}
                      </pre>
                    ) : (
                      <span className="text-text-secondary italic text-red-500">
                        None (Record Deleted)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border flex justify-end bg-bg">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 border border-border text-xs font-semibold rounded-lg hover:bg-bg-subtle transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
