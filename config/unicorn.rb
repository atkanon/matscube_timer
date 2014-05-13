worker_processes Integer(ENV["WEB_CONCURRENCY"] || 3) # 子プロセスいくつ立ち上げるか
timeout 15
preload_app true

# listen /path/to/rails/tmp/unicorn.sock # こっちのほうが高速
listen 3000

# pid file path Capistranoとか使う時は要設定か
# pid /path/to/rails/tmp/pids/unicorn.pid

# Configure log
stderr_path File.expand_path('log/unicorn.log', ENV['RAILS_ROOT'])
stdout_path File.expand_path('log/unicorn.log', ENV['RAILS_ROOT'])

before_fork do |server, worker|
  old_pid = "#{ server.config[:pid] }.oldbin"
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      # Kill if old process is running
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
      # someone else did our job for us
    end
  end

  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!
end

after_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn worker intercepting TERM and doing nothing. Wait for master to send QUIT'
  end

  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.establish_connection
end

def rails_root
  require "pathname"
  Pathname.new(__FILE__) + "../../"
end