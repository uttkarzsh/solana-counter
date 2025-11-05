import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterProgram } from "../target/types/counter_program";

describe("counter_program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.counter_program as Program<CounterProgram>;

  const counterKeypair = anchor.web3.Keypair.generate();

  it("Initialize Counter", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().accounts({
      counter: counterKeypair.publicKey,
      user: provider.wallet.publicKey,
    }).signers([counterKeypair]).rpc();

    const account = await program.account.counter.fetch(counterKeypair.publicKey);
    console.log("Initialized count:", account.count.toString());
  });

  it("Increment counter", async () => {
    await program.methods
      .increment()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc();

    const account = await program.account.counter.fetch(counterKeypair.publicKey);
    console.log("After increment:", account.count.toString());
  });

  it("Set counter to 67", async () => {
    await program.methods
      .setCount(new anchor.BN(67))
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc();

    const account = await program.account.counter.fetch(counterKeypair.publicKey);
    console.log("After setCount:", account.count.toString());
  });

  it("Decrement counter", async () => {
    await program.methods
      .decrement()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc();

    const account = await program.account.counter.fetch(counterKeypair.publicKey);
    console.log("After decrement:", account.count.toString());
  });

});
