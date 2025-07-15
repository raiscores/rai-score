import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, TrendingUp, Building2 } from 'lucide-react';

// Extended company data with 100 companies across various industries
const companies = [
  { slug: "3m", name: "3M", industry: "Manufacturing", score: 4.2, max_score: 6 },
  { slug: "adobe", name: "Adobe", industry: "Software", score: 4.8, max_score: 6 },
  { slug: "airbnb", name: "Airbnb", industry: "Travel & Hospitality", score: 3.9, max_score: 6 },
  { slug: "alibaba", name: "Alibaba", industry: "E-commerce", score: 3.4, max_score: 6 },
  { slug: "alphabet", name: "Alphabet", industry: "Technology", score: 4.6, max_score: 6 },
  { slug: "amazon", name: "Amazon", industry: "E-commerce", score: 4.1, max_score: 6 },
  { slug: "amd", name: "AMD", industry: "Semiconductors", score: 4.3, max_score: 6 },
  { slug: "american-express", name: "American Express", industry: "Financial Services", score: 4.7, max_score: 6 },
  { slug: "anthropic", name: "Anthropic", industry: "AI Research", score: 5.2, max_score: 6 },
  { slug: "apple", name: "Apple", industry: "Technology", score: 4.9, max_score: 6 },
  { slug: "atlassian", name: "Atlassian", industry: "Software", score: 4.5, max_score: 6 },
  { slug: "baidu", name: "Baidu", industry: "Internet Services", score: 3.1, max_score: 6 },
  { slug: "bank-of-america", name: "Bank of America", industry: "Banking", score: 4.0, max_score: 6 },
  { slug: "berkshire-hathaway", name: "Berkshire Hathaway", industry: "Conglomerate", score: 3.8, max_score: 6 },
  { slug: "boeing", name: "Boeing", industry: "Aerospace", score: 3.6, max_score: 6 },
  { slug: "booking", name: "Booking Holdings", industry: "Travel & Hospitality", score: 3.7, max_score: 6 },
  { slug: "broadcom", name: "Broadcom", industry: "Semiconductors", score: 4.1, max_score: 6 },
  { slug: "capital-one", name: "Capital One", industry: "Financial Services", score: 4.4, max_score: 6 },
  { slug: "chevron", name: "Chevron", industry: "Energy", score: 2.9, max_score: 6 },
  { slug: "cisco", name: "Cisco", industry: "Networking", score: 4.6, max_score: 6 },
  { slug: "citigroup", name: "Citigroup", industry: "Banking", score: 4.2, max_score: 6 },
  { slug: "coca-cola", name: "Coca-Cola", industry: "Beverages", score: 3.5, max_score: 6 },
  { slug: "comcast", name: "Comcast", industry: "Telecommunications", score: 3.3, max_score: 6 },
  { slug: "costco", name: "Costco", industry: "Retail", score: 4.0, max_score: 6 },
  { slug: "crowdstrike", name: "CrowdStrike", industry: "Cybersecurity", score: 4.7, max_score: 6 },
  { slug: "deere", name: "Deere & Company", industry: "Manufacturing", score: 3.9, max_score: 6 },
  { slug: "disney", name: "Disney", industry: "Entertainment", score: 3.8, max_score: 6 },
  { slug: "dropbox", name: "Dropbox", industry: "Cloud Storage", score: 4.1, max_score: 6 },
  { slug: "ebay", name: "eBay", industry: "E-commerce", score: 3.6, max_score: 6 },
  { slug: "eli-lilly", name: "Eli Lilly", industry: "Pharmaceuticals", score: 4.3, max_score: 6 },
  { slug: "exxon-mobil", name: "ExxonMobil", industry: "Energy", score: 2.7, max_score: 6 },
  { slug: "facebook", name: "Meta", industry: "Social Media", score: 3.2, max_score: 6 },
  { slug: "fedex", name: "FedEx", industry: "Logistics", score: 3.8, max_score: 6 },
  { slug: "ford", name: "Ford", industry: "Automotive", score: 3.9, max_score: 6 },
  { slug: "general-electric", name: "General Electric", industry: "Conglomerate", score: 3.7, max_score: 6 },
  { slug: "general-motors", name: "General Motors", industry: "Automotive", score: 4.0, max_score: 6 },
  { slug: "github", name: "GitHub", industry: "Software Development", score: 4.8, max_score: 6 },
  { slug: "goldman-sachs", name: "Goldman Sachs", industry: "Investment Banking", score: 4.1, max_score: 6 },
  { slug: "google", name: "Google", industry: "Internet Services", score: 4.5, max_score: 6 },
  { slug: "home-depot", name: "Home Depot", industry: "Retail", score: 3.4, max_score: 6 },
  { slug: "honeywell", name: "Honeywell", industry: "Conglomerate", score: 4.2, max_score: 6 },
  { slug: "hp", name: "HP Inc.", industry: "Computer Hardware", score: 4.0, max_score: 6 },
  { slug: "huawei", name: "Huawei", industry: "Telecommunications", score: 2.8, max_score: 6 },
  { slug: "ibm", name: "IBM", industry: "Technology", score: 4.9, max_score: 6 },
  { slug: "intel", name: "Intel", industry: "Semiconductors", score: 4.4, max_score: 6 },
  { slug: "intuit", name: "Intuit", industry: "Financial Software", score: 4.6, max_score: 6 },
  { slug: "johnson-johnson", name: "Johnson & Johnson", industry: "Pharmaceuticals", score: 4.5, max_score: 6 },
  { slug: "jpmorgan", name: "JPMorgan Chase", industry: "Banking", score: 4.3, max_score: 6 },
  { slug: "lockheed-martin", name: "Lockheed Martin", industry: "Aerospace", score: 3.5, max_score: 6 },
  { slug: "mastercard", name: "Mastercard", industry: "Financial Services", score: 4.8, max_score: 6 },
  { slug: "mcdonalds", name: "McDonald's", industry: "Food Service", score: 3.2, max_score: 6 },
  { slug: "microsoft", name: "Microsoft", industry: "Technology", score: 5.1, max_score: 6 },
  { slug: "netflix", name: "Netflix", industry: "Entertainment", score: 4.2, max_score: 6 },
  { slug: "nike", name: "Nike", industry: "Apparel", score: 3.7, max_score: 6 },
  { slug: "nvidia", name: "NVIDIA", industry: "Semiconductors", score: 4.7, max_score: 6 },
  { slug: "openai", name: "OpenAI", industry: "AI Research", score: 4.9, max_score: 6 },
  { slug: "oracle", name: "Oracle", industry: "Database Software", score: 4.2, max_score: 6 },
  { slug: "palantir", name: "Palantir", industry: "Data Analytics", score: 3.8, max_score: 6 },
  { slug: "paypal", name: "PayPal", industry: "Fintech", score: 4.4, max_score: 6 },
  { slug: "pepsico", name: "PepsiCo", industry: "Beverages", score: 3.6, max_score: 6 },
  { slug: "pfizer", name: "Pfizer", industry: "Pharmaceuticals", score: 4.4, max_score: 6 },
  { slug: "procter-gamble", name: "Procter & Gamble", industry: "Consumer Goods", score: 3.9, max_score: 6 },
  { slug: "qualcomm", name: "Qualcomm", industry: "Semiconductors", score: 4.5, max_score: 6 },
  { slug: "salesforce", name: "Salesforce", industry: "CRM Software", score: 4.8, max_score: 6 },
  { slug: "samsung", name: "Samsung", industry: "Consumer Electronics", score: 4.1, max_score: 6 },
  { slug: "shopify", name: "Shopify", industry: "E-commerce", score: 4.3, max_score: 6 },
  { slug: "slack", name: "Slack", industry: "Communication", score: 4.5, max_score: 6 },
  { slug: "snowflake", name: "Snowflake", industry: "Cloud Computing", score: 4.6, max_score: 6 },
  { slug: "sony", name: "Sony", industry: "Consumer Electronics", score: 4.0, max_score: 6 },
  { slug: "spotify", name: "Spotify", industry: "Music Streaming", score: 4.1, max_score: 6 },
  { slug: "square", name: "Block (Square)", industry: "Fintech", score: 4.2, max_score: 6 },
  { slug: "starbucks", name: "Starbucks", industry: "Food Service", score: 3.8, max_score: 6 },
  { slug: "target", name: "Target", industry: "Retail", score: 3.9, max_score: 6 },
  { slug: "tesla", name: "Tesla", industry: "Automotive", score: 4.4, max_score: 6 },
  { slug: "tiktok", name: "TikTok", industry: "Social Media", score: 2.9, max_score: 6 },
  { slug: "toyota", name: "Toyota", industry: "Automotive", score: 4.2, max_score: 6 },
  { slug: "twitter", name: "X (Twitter)", industry: "Social Media", score: 2.6, max_score: 6 },
  { slug: "uber", name: "Uber", industry: "Transportation", score: 3.5, max_score: 6 },
  { slug: "unilever", name: "Unilever", industry: "Consumer Goods", score: 4.0, max_score: 6 },
  { slug: "ups", name: "UPS", industry: "Logistics", score: 3.9, max_score: 6 },
  { slug: "visa", name: "Visa", industry: "Financial Services", score: 4.7, max_score: 6 },
  { slug: "walmart", name: "Walmart", industry: "Retail", score: 3.7, max_score: 6 },
  { slug: "wells-fargo", name: "Wells Fargo", industry: "Banking", score: 3.8, max_score: 6 },
  { slug: "zoom", name: "Zoom", industry: "Video Communications", score: 4.3, max_score: 6 }
].sort((a, b) => a.name.localeCompare(b.name));

// Helper function to get score color
const getScoreColor = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return '#facc15'; // Gold for excellent
  if (percentage >= 70) return '#3b82f6'; // Primary blue for good
  if (percentage >= 60) return '#0ea5e9'; // Sky blue for fair
  return '#64748b'; // Slate for poor
};

// Helper function to get score background color
const getScoreBackgroundColor = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'rgba(250, 204, 21, 0.1)';
  if (percentage >= 70) return 'rgba(59, 130, 246, 0.1)';
  if (percentage >= 60) return 'rgba(14, 165, 233, 0.1)';
  return 'rgba(100, 116, 139, 0.1)';
};

// Helper function to generate company initials
const getCompanyInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
};

function CompanyDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageScore = companies.reduce((sum, company) => sum + company.score, 0) / companies.length;

  // CSS for responsive grid
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '4rem',
    marginBottom: '2rem'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem'
        }}>
          <h1 style={{ 
            color: '#1e293b',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            letterSpacing: '-0.025em'
          }}>
            Company Directory
          </h1>
          <p style={{ 
            color: '#64748b',
            fontSize: '1.125rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            Browse and compare companies based on their Responsible AI practices. 
            Our methodology evaluates organizations across key pillars of AI governance.
          </p>
          
          {/* Stats Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: '600' }}>
                {companies.length}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Companies Evaluated
              </div>
            </div>
            <div style={{
              backgroundColor: 'rgba(250, 204, 21, 0.1)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(250, 204, 21, 0.2)'
            }}>
              <div style={{ color: '#eab308', fontSize: '1.5rem', fontWeight: '600' }}>
                {averageScore.toFixed(1)}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Average Score
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ 
            position: 'relative',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b'
              }} 
            />
            <input
              type="text"
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
          </div>
        </div>

        {/* Results Info */}
        <div style={{
          marginBottom: '1.5rem',
          color: '#64748b',
          fontSize: '0.875rem'
        }}>
          Showing {filteredCompanies.length} of {companies.length} companies
          {searchTerm && ` matching "${searchTerm}"`}
        </div>

        {/* Company Grid */}
        <div style={gridStyle}>
          {filteredCompanies.map((company) => (
            <Link 
              key={company.slug}
              to={`/company/${company.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(203, 213, 225, 0.5)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.5)';
                }}
              >
                {/* Company Header */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  {/* Company Avatar */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <span style={{
                      color: '#3b82f6',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>
                      {getCompanyInitials(company.name)}
                    </span>
                  </div>
                  
                  {/* Company Info */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      color: '#1e293b',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      margin: '0 0 0.25rem 0',
                      lineHeight: '1.2'
                    }}>
                      {company.name}
                    </h3>
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(100, 116, 139, 0.1)',
                      color: '#64748b',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {company.industry}
                    </div>
                  </div>
                </div>

                {/* Score Section */}
                <div style={{ 
                  marginTop: 'auto',
                  padding: '1rem',
                  backgroundColor: getScoreBackgroundColor(company.score, company.max_score),
                  borderRadius: '12px',
                  border: `1px solid ${getScoreColor(company.score, company.max_score)}20`
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ 
                      color: '#64748b',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      Responsible AI Score
                    </span>
                    <span style={{ 
                      color: getScoreColor(company.score, company.max_score),
                      fontSize: '1.5rem',
                      fontWeight: '700'
                    }}>
                      {company.score.toFixed(1)}
                      <span style={{ 
                        fontSize: '1rem',
                        color: '#64748b',
                        fontWeight: '400'
                      }}>
                        /{company.max_score}
                      </span>
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'rgba(100, 116, 139, 0.2)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(company.score / company.max_score) * 100}%`,
                      backgroundColor: getScoreColor(company.score, company.max_score),
                      borderRadius: '3px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCompanies.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#64748b'
          }}>
            <Building2 size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              No companies found
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              Try adjusting your search terms or browse all companies
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDirectory;