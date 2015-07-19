require 'csv'

task default: %w[test]

task :test do
  csv = CSV.read("iin-user-contributions.csv", { headers: true, header_converters: :symbol, converters: :all})
  iins = csv.map { |r| r[:iin] }
  puts iins.sort_by(&:to_s) == iins ? 'Sorted correctly' : 'Not sorted correctly'
end
