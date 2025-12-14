import React, { useState } from 'react';

// Simple icons
const Dog = () => <span style={{fontSize: '1.2em'}}>🐕</span>;
const Download = () => <span style={{fontSize: '1.2em'}}>⬇️</span>;
const Loader = () => <span style={{fontSize: '1.2em'}}>⏳</span>;
const ArrowRight = () => <span style={{fontSize: '1.2em'}}>→</span>;
const ArrowLeft = () => <span style={{fontSize: '1.2em'}}>←</span>;

export default function DogTrainingExpert() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [formData, setFormData] = useState({
    dogName: '', breed: '', age: '', size: '', sex: '', problemBehaviors: '', whenOccurs: '', 
    homeType: '', yardSize: '', familyMembers: '', otherPets: '', triedMethods: '', exerciseRoutine: '', 
    diet: '', medicalIssues: '', trainingGoals: '', timeline: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const generate = async () => {
    setLoading(true);
    const prompt = `You are a certified dog trainer with 20+ years experience. Create a comprehensive training plan for this dog:

DOG PROFILE:
Name: ${formData.dogName}
Breed: ${formData.breed}
Age: ${formData.age}
Size: ${formData.size}
Sex: ${formData.sex}

BEHAVIOR ISSUES:
Problems: ${formData.problemBehaviors}
When They Occur: ${formData.whenOccurs}

HOME ENVIRONMENT:
Type: ${formData.homeType}
Yard: ${formData.yardSize}
Family: ${formData.familyMembers}
Other Pets: ${formData.otherPets}

CURRENT SITUATION:
Methods Tried: ${formData.triedMethods}
Exercise Routine: ${formData.exerciseRoutine}
Diet: ${formData.diet}
Medical Issues: ${formData.medicalIssues}

GOALS:
Training Goals: ${formData.trainingGoals}
Timeline: ${formData.timeline}

Create a detailed 8-12 week training plan with:
1. OVERVIEW - Summary of ${formData.dogName}'s situation and breed-specific insights
2. BEHAVIOR ANALYSIS - Root causes of each problem behavior
3. TRAINING PHILOSOPHY - Approach tailored to this specific dog
4. WEEK-BY-WEEK PLAN - Detailed weekly training schedule with specific exercises
5. DAILY ROUTINE - Exact daily schedule including training, exercise, feeding
6. SPECIFIC TECHNIQUES - Step-by-step instructions for each behavior issue
7. TROUBLESHOOTING - What to do when progress stalls
8. EXERCISE & ENRICHMENT - Activities beyond basic training
9. SOCIALIZATION PLAN - How to socialize ${formData.dogName} properly
10. PROGRESS TRACKING - Milestones and how to measure success
11. TOOLS & EQUIPMENT - What you'll need
12. RED FLAGS - When to consult a vet or professional behaviorist

Be specific to ${formData.breed} breed characteristics. Make it actionable and realistic.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 12000,
          messages: [{role: "user", content: prompt}]
        })
      });
      const data = await response.json();
      setPlan(data.content[0].text);
      setCurrentPage(4);
    } catch (error) {
      alert("Error generating plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    const el = document.createElement("a");
    const file = new Blob([plan], {type: 'text/plain'});
    el.href = URL.createObjectURL(file);
    el.download = `${formData.dogName}_Training_Plan.txt`;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  };

  const inputStyle = {width: '100%', padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem'};
  const labelStyle = {display: 'block', fontWeight: '600', marginBottom: '0.5rem'};

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', padding: '2rem'}}>
      <div style={{maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2.5rem'}}>🐕</div>
          <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Dog Training Expert</h1>
          <p style={{color: '#6b7280', fontSize: '1.1rem'}}>Breed-specific training plans that work</p>
        </div>

        {currentPage === 1 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <h2 style={{fontSize: '1.8rem', fontWeight: '700'}}>About Your Dog</h2>
            <div><label style={labelStyle}>Dog's Name *</label><input type="text" name="dogName" value={formData.dogName} onChange={handleChange} placeholder="e.g., Max" style={inputStyle}/></div>
            <div><label style={labelStyle}>Breed *</label><input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="e.g., German Shepherd, Labrador Mix" style={inputStyle}/></div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
              <div><label style={labelStyle}>Age</label><input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="e.g., 2 years" style={inputStyle}/></div>
              <div><label style={labelStyle}>Size</label><select name="size" value={formData.size} onChange={handleChange} style={inputStyle}><option value="">Select...</option><option value="small">Small (0-25 lbs)</option><option value="medium">Medium (25-60 lbs)</option><option value="large">Large (60-100 lbs)</option><option value="giant">Giant (100+ lbs)</option></select></div>
              <div><label style={labelStyle}>Sex</label><select name="sex" value={formData.sex} onChange={handleChange} style={inputStyle}><option value="">Select...</option><option value="male">Male</option><option value="female">Female</option></select></div>
            </div>
            <button onClick={() => setCurrentPage(2)} style={{padding: '1rem', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>Continue <ArrowRight size={20}/></button>
          </div>
        )}

        {currentPage === 2 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <h2 style={{fontSize: '1.8rem', fontWeight: '700'}}>Behavior & Environment</h2>
            <div><label style={labelStyle}>Problem Behaviors *</label><textarea name="problemBehaviors" value={formData.problemBehaviors} onChange={handleChange} placeholder="e.g., Excessive barking, jumping on guests, pulling on leash, aggression toward other dogs" style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}/></div>
            <div><label style={labelStyle}>When Do These Behaviors Occur?</label><textarea name="whenOccurs" value={formData.whenOccurs} onChange={handleChange} placeholder="e.g., Barks when alone, jumps when excited, pulls during walks" style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}/></div>
            <div><label style={labelStyle}>Home Type</label><select name="homeType" value={formData.homeType} onChange={handleChange} style={inputStyle}><option value="">Select...</option><option value="apartment">Apartment</option><option value="house-no-yard">House (no yard)</option><option value="house-small-yard">House (small yard)</option><option value="house-large-yard">House (large yard)</option><option value="farm">Farm/Rural</option></select></div>
            <div><label style={labelStyle}>Yard Size</label><input type="text" name="yardSize" value={formData.yardSize} onChange={handleChange} placeholder="e.g., Small fenced backyard, no yard, 1 acre" style={inputStyle}/></div>
            <div><label style={labelStyle}>Family Members</label><textarea name="familyMembers" value={formData.familyMembers} onChange={handleChange} placeholder="Who lives with the dog? Ages of children?" style={{...inputStyle, minHeight: '60px', resize: 'vertical'}}/></div>
            <div><label style={labelStyle}>Other Pets</label><input type="text" name="otherPets" value={formData.otherPets} onChange={handleChange} placeholder="e.g., 1 cat, 2 other dogs" style={inputStyle}/></div>
            <div style={{display: 'flex', gap: '1rem'}}>
              <button onClick={() => setCurrentPage(1)} style={{flex: 1, padding: '1rem', background: 'white', color: '#FF6B6B', border: '2px solid #FF6B6B', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer'}}><ArrowLeft size={20}/> Back</button>
              <button onClick={() => setCurrentPage(3)} style={{flex: 2, padding: '1rem', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer'}}>Continue <ArrowRight size={20}/></button>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <h2 style={{fontSize: '1.8rem', fontWeight: '700'}}>Training History & Goals</h2>
            <div><label style={labelStyle}>Training Methods Already Tried</label><textarea name="triedMethods" value={formData.triedMethods} onChange={handleChange} placeholder="e.g., Tried positive reinforcement, obedience classes, YouTube videos" style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}/></div>
            <div><label style={labelStyle}>Current Exercise Routine</label><textarea name="exerciseRoutine" value={formData.exerciseRoutine} onChange={handleChange} placeholder="e.g., 2 walks per day (20 min each), plays fetch on weekends" style={{...inputStyle, minHeight: '60px', resize: 'vertical'}}/></div>
            <div><label style={labelStyle}>Diet</label><input type="text" name="diet" value={formData.diet} onChange={handleChange} placeholder="e.g., Purina Pro Plan, 2 cups twice daily" style={inputStyle}/></div>
            <div><label style={labelStyle}>Medical Issues</label><textarea name="medicalIssues" value={formData.medicalIssues} onChange={handleChange} placeholder="Any health problems, allergies, or medications?" style={{...inputStyle, minHeight: '60px', resize: 'vertical'}}/></div>
            <div><label style={labelStyle}>Training Goals *</label><textarea name="trainingGoals" value={formData.trainingGoals} onChange={handleChange} placeholder="What behaviors do you want to achieve? e.g., Stop barking, walk calmly on leash, be friendly with guests" style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}/></div>
            <div><label style={labelStyle}>Timeline</label><select name="timeline" value={formData.timeline} onChange={handleChange} style={inputStyle}><option value="">Select...</option><option value="4-weeks">4 Weeks (Urgent)</option><option value="8-weeks">8 Weeks (Standard)</option><option value="12-weeks">12 Weeks (Comprehensive)</option><option value="ongoing">Ongoing/Flexible</option></select></div>
            <div style={{display: 'flex', gap: '1rem'}}>
              <button onClick={() => setCurrentPage(2)} style={{flex: 1, padding: '1rem', background: 'white', color: '#FF6B6B', border: '2px solid #FF6B6B', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer'}}><ArrowLeft size={20}/> Back</button>
              <button onClick={generate} disabled={loading} style={{flex: 2, padding: '1rem', background: loading ? '#9ca3af' : 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                {loading ? <><Loader className="spinning" size={20}/>Generating...</> : <>Generate Training Plan</>}
              </button>
            </div>
          </div>
        )}

        {currentPage === 4 && plan && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
              <h2 style={{fontSize: '1.8rem', fontWeight: '700'}}>{formData.dogName}'s Training Plan</h2>
              <button onClick={download} style={{padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 50%, #00E5FF 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Download size={20}/>Download</button>
            </div>
            <div style={{background: '#f9fafb', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', maxHeight: '600px', overflowY: 'auto', border: '1px solid #e5e7eb'}}>
              <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: '1.8', color: '#1a1a1a'}}>{plan}</pre>
            </div>
            <button onClick={() => {setCurrentPage(1); setPlan(null);}} style={{width: '100%', padding: '1rem', background: 'white', color: '#FF6B6B', border: '2px solid #FF6B6B', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer'}}>Create Another Plan</button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.spinning{animation:spin 1s linear infinite}`}</style>
    </div>
  );
}