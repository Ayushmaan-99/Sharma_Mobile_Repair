module.exports = {
    apps: [
        {
            name: 'sharma-mobile-repair',
            cwd: './backend',
            script: 'server.js',
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            max_memory_restart: '300M',
            autorestart: true,
            exp_backoff_restart_delay: 100,
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        }
    ]
};
