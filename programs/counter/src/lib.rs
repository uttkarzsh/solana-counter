use anchor_lang::prelude::*;

declare_id!("9hjmtXpw32DwY61S5GkmDSLgRYyFuz2JUa7rgB3x6Xvx");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
